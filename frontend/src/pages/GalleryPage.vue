<template>
  <div class="gallery-page">
    <section class="gallery-hero">
      <div class="container">
        <h1>{{ $t('gallery.heading') }}</h1>
        <p>{{ $t('gallery.subheading') }}</p>
      </div>
    </section>

    <section class="gallery-content">
      <div class="gallery-full-grid">
        <div
          v-for="item in allGalleryItems"
          :key="item.id"
          class="gallery-full-item"
          @click="openLightbox(item)"
          role="button"
          tabindex="0"
          @keydown.enter="openLightbox(item)"
        >
          <img :src="item.src" :alt="item.alt" loading="lazy" />
          <div class="gallery-overlay">
            <div class="gallery-overlay-text">
              <p>{{ item.title }}</p>
              <span>{{ item.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div v-if="lightboxItem" class="lightbox" @click.self="lightboxItem = null" @keydown.escape="lightboxItem = null" tabindex="0" ref="lightboxRef">
      <button class="lightbox-close" @click="lightboxItem = null" aria-label="Close">&times;</button>
      <img :src="lightboxItem.src" :alt="lightboxItem.alt" class="lightbox-img" />
      <div class="lightbox-caption">
        <p>{{ lightboxItem.title }}</p>
        <span>{{ lightboxItem.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { galleryItems } from '../data/services.js';

const lightboxItem = ref(null);
const lightboxRef = ref(null);

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const apiImages = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(`${apiBase}/images`);
    if (res.ok) {
      const data = await res.json();
      apiImages.value = (data.images || []).map((img, i) => ({
        id: `api-${i}-${img.filename}`,
        src: `${apiBase}${img.url}`,
        alt: img.filename.replace(/^[a-f0-9]+-/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' '),
        title: img.filename.replace(/^[a-f0-9]+-/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' '),
        tag: 'Our Work'
      }));
    }
  } catch { /* non-fatal — fall back to local items */ }
});

// Merge local gallery items with uploaded images (uploaded first)
const allGalleryItems = computed(() => [...apiImages.value, ...galleryItems]);

async function openLightbox(item) {
  lightboxItem.value = item;
  await nextTick();
  lightboxRef.value?.focus();
}
</script>

<style scoped>
.gallery-page { background: #fff; }
.gallery-hero {
  padding: 4rem 1.5rem 3rem; text-align: center;
  background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
}
.gallery-hero h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; color: #1f2937; }
.gallery-hero p { margin-top: 0.75rem; font-size: 1.125rem; color: #6b7280; }

.gallery-content { padding: 3rem 1.5rem 6rem; max-width: 1280px; margin: 0 auto; }
.gallery-full-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
}
.gallery-full-item {
  border-radius: 1rem; overflow: hidden; position: relative;
  cursor: pointer; aspect-ratio: 4/3;
}
.gallery-full-item img {
  width: 100%; height: 100%; object-fit: cover; transition: transform .5s;
}
.gallery-full-item:hover img { transform: scale(1.05); }
.gallery-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  opacity: 0; transition: opacity .3s; display: flex; align-items: flex-end; padding: 1.5rem;
}
.gallery-full-item:hover .gallery-overlay { opacity: 1; }
.gallery-overlay-text p { color: #fff; font-weight: 700; font-size: 1.125rem; }
.gallery-overlay-text span { color: #fbcfe8; font-size: 0.875rem; font-weight: 500; }

.lightbox {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.9); display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: 2rem;
}
.lightbox-close {
  position: absolute; top: 1.5rem; right: 1.5rem;
  font-size: 2.5rem; color: #fff; background: none; border: none;
  cursor: pointer; line-height: 1;
}
.lightbox-img { max-width: 90vw; max-height: 75vh; border-radius: 1rem; object-fit: contain; }
.lightbox-caption { text-align: center; margin-top: 1rem; }
.lightbox-caption p { color: #fff; font-weight: 700; font-size: 1.25rem; }
.lightbox-caption span { color: #fbcfe8; font-size: 0.875rem; }

@media (max-width: 768px) {
  .gallery-full-grid { grid-template-columns: 1fr; }
}
</style>
