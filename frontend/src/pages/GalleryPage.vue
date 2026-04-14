<template>
  <div class="gallery-page">
    <section class="gallery-hero">
      <div class="container">
        <h1>Our Work Speaks for Itself</h1>
        <p>{{ $t('gallery.subheading') }}</p>
      </div>
    </section>

    <section class="gallery-content">
      <div v-if="allGalleryItems.length" class="gallery-full-grid">
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
        </div>
      </div>
      <p v-else class="gallery-empty">No additional gallery images yet.</p>
    </section>

    <!-- Lightbox -->
    <div v-if="lightboxItem" class="lightbox" @click.self="lightboxItem = null" @keydown.escape="lightboxItem = null" tabindex="0" ref="lightboxRef">
      <button class="lightbox-close" @click="lightboxItem = null" aria-label="Close">&times;</button>
      <img :src="lightboxItem.src" :alt="lightboxItem.alt" class="lightbox-img" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { fullGalleryItems } from '../data/services.js';

const lightboxItem = ref(null);
const lightboxRef = ref(null);
const allGalleryItems = fullGalleryItems;

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
.gallery-empty { text-align: center; color: #6b7280; font-size: 1rem; padding: 2rem 1rem; }
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

@media (max-width: 768px) {
  .gallery-full-grid { grid-template-columns: 1fr; }
}
</style>
