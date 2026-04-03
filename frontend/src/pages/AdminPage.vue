<template>
  <div class="admin-page">
    <section class="admin-hero">
      <div class="container"><h1>Admin — Review & Gallery Management</h1></div>
    </section>

    <section class="admin-content container">
      <!-- ── Image Upload ── -->
      <div class="admin-panel">
        <h2>Gallery Images</h2>
        <div class="upload-area">
          <label for="img-upload" class="btn-pink upload-label">
            Choose Images (JPEG / PNG / WebP, max 5 MB each)
          </label>
          <input
            id="img-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            class="sr-only"
            @change="onFilesSelected"
          />
          <span v-if="selectedFiles.length" class="file-names">
            {{ selectedFiles.map(f => f.name).join(', ') }}
          </span>
        </div>
        <button class="btn-pink" :disabled="!selectedFiles.length || uploading" @click="handleUpload">
          {{ uploading ? 'Uploading…' : 'Upload' }}
        </button>
        <p v-if="uploadError" class="error-msg">{{ uploadError }}</p>

        <div v-if="uploadedImages.length" class="image-grid">
          <div v-for="img in uploadedImages" :key="img.filename" class="image-thumb">
            <img :src="`${apiBase}${img.url}`" :alt="img.filename" loading="lazy" />
            <button class="btn-back thumb-del" @click="handleDeleteImage(img.filename)" title="Delete">✕</button>
          </div>
        </div>
        <p v-else class="empty">No uploaded images yet.</p>
      </div>

      <!-- ── Reviews ── -->
      <div class="admin-panel">
        <h2>User Reviews</h2>
        <div class="admin-actions">
          <button class="btn-pink" @click="handleClearAll" :disabled="clearing">Clear All User Reviews</button>
        </div>
        <div v-if="storedReviews.length" class="reviews-list">
          <div v-for="rev in storedReviews" :key="rev.id" class="review-item">
            <div class="review-header">
              <strong>{{ rev.name }}</strong> — {{ rev.service }} — {{ rev.rating }}★
            </div>
            <p>"{{ rev.text }}"</p>
            <button class="btn-back" @click="handleDelete(rev.id)" :disabled="deleting === rev.id">Delete</button>
          </div>
        </div>
        <p v-else class="empty">No user-submitted reviews.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useReviews from '../composables/useReviews.js';

const { storedReviews, loadReviews, removeReview, clearStoredReviews } = useReviews();
const deleting = ref(null);
const clearing = ref(false);

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const adminToken = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('sl_admin_token') || '' : '';

// ── Image Upload ──
const selectedFiles = ref([]);
const uploading = ref(false);
const uploadError = ref('');
const uploadedImages = ref([]);

async function loadImages() {
  try {
    const res = await fetch(`${apiBase}/images`);
    if (!res.ok) return;
    const data = await res.json();
    uploadedImages.value = Array.isArray(data.images) ? data.images : [];
  } catch { /* non-fatal */ }
}

function onFilesSelected(e) {
  selectedFiles.value = Array.from(e.target.files || []);
  uploadError.value = '';
}

async function handleUpload() {
  if (!selectedFiles.value.length) return;
  uploading.value = true;
  uploadError.value = '';
  try {
    const form = new FormData();
    for (const file of selectedFiles.value) form.append('images', file);
    const res = await fetch(`${apiBase}/images`, {
      method: 'POST',
      headers: { 'x-admin-token': adminToken },
      body: form
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      uploadError.value = err.error || 'Upload failed.';
      return;
    }
    selectedFiles.value = [];
    await loadImages();
  } catch {
    uploadError.value = 'Upload failed. Check your connection.';
  } finally {
    uploading.value = false;
  }
}

async function handleDeleteImage(filename) {
  if (!confirm(`Delete image "${filename}"?`)) return;
  try {
    await fetch(`${apiBase}/images/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': adminToken }
    });
    await loadImages();
  } catch { alert('Delete failed.'); }
}

// ── Reviews ──
onMounted(async () => {
  await Promise.all([loadReviews().catch(() => {}), loadImages()]);
});

async function handleDelete(id) {
  deleting.value = id;
  try { await removeReview(id); } catch { alert('Delete failed.'); }
  finally { deleting.value = null; }
}

async function handleClearAll() {
  if (!confirm('Clear all user-submitted reviews?')) return;
  clearing.value = true;
  try { await clearStoredReviews(); } catch { alert('Clear failed.'); }
  finally { clearing.value = false; }
}
</script>

<style scoped>
.admin-page { background: #fff; }
.admin-hero { padding: 4rem 1.5rem 2rem; background: #f9fafb; text-align: center; }
.admin-hero h1 { font-size: 1.75rem; font-weight: 900; color: #1f2937; }
.admin-content { max-width: 860px; padding: 2rem 1.5rem 6rem; display: flex; flex-direction: column; gap: 3rem; }
.admin-panel { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 1.25rem; padding: 2rem; }
.admin-panel h2 { font-size: 1.2rem; font-weight: 800; color: #1f2937; margin: 0 0 1.25rem; }
.admin-actions { margin-bottom: 1.5rem; }
.upload-area { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; }
.upload-label { cursor: pointer; }
.file-names { font-size: 0.85rem; color: #6b7280; }
.error-msg { color: #ef4444; margin-top: 0.5rem; font-size: 0.875rem; }
.image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.75rem; margin-top: 1.5rem; }
.image-thumb { position: relative; border-radius: 0.75rem; overflow: hidden; aspect-ratio: 1; background: #e5e7eb; }
.image-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.thumb-del { position: absolute; top: 0.4rem; right: 0.4rem; padding: 0.15rem 0.5rem; font-size: 0.8rem; border-radius: 50%; background: rgba(239,68,68,0.85); color: #fff; border: none; cursor: pointer; }
.reviews-list { display: flex; flex-direction: column; gap: 1rem; }
.review-item { background: #fff; border: 1px solid #f3f4f6; border-radius: 1rem; padding: 1.5rem; }
.review-header { margin-bottom: 0.5rem; font-size: 0.95rem; }
.review-item p { color: #4b5563; font-style: italic; margin-bottom: 0.75rem; }
.empty { color: #9ca3af; text-align: center; padding: 2rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>

