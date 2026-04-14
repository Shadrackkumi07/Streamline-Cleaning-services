<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-badge">
            <img src="https://img.icons8.com/plasticine/100/cleaning-services.png" alt="Top Rated Cleaning Service badge" loading="lazy" />
            {{ $t('hero.badge') }}
          </div>
          <h1>{{ $t('hero.title1') }}<br/><span>{{ $t('hero.title2') }}</span></h1>
          <p class="hero-desc">{{ $t('hero.description') }}</p>
          <div class="hero-btns">
            <router-link :to="{ name: 'booking' }" class="btn-primary">
              {{ $t('hero.bookNow') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </router-link>
            <a href="#services" class="btn-outline">{{ $t('hero.viewServices') }}</a>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Spotless Living Room" loading="eager" />
            <div class="hero-img-overlay"></div>
          </div>
          <div class="hero-badge-float">
            <div class="hero-badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <p class="badge-title">{{ $t('hero.satisfaction') }}</p>
              <p class="badge-sub">{{ $t('hero.guaranteed') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="services-section">
      <div class="section-header">
        <h2>{{ $t('services.heading') }}</h2>
        <p>{{ $t('services.subheading') }}</p>
      </div>
      <div class="services-grid">
        <div v-for="svc in services" :key="svc.id" class="service-card">
          <div class="service-icon">
            <img :src="serviceBadgeUrls[svc.icon] || serviceBadgeUrls.building" :alt="`${svc.name} badge`" loading="lazy" />
          </div>
          <h3>{{ svc.name }}</h3>
          <p>{{ svc.description }}</p>
          <div class="service-price">{{ svc.price }} <span>{{ svc.priceLabel }}</span></div>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section id="gallery" class="gallery-section">
      <div class="section-header">
        <h2>{{ $t('gallery.heading') }}</h2>
        <p>{{ $t('gallery.subheading') }}</p>
      </div>
      <div class="before-after-cases">
        <article v-for="caseItem in beforeAfterCases" :key="caseItem.id" class="before-after-case">
          <div class="case-top">
            <h3>{{ caseItem.title }}</h3>
            <p>Before and after transformation</p>
          </div>
          <div class="case-columns">
            <div class="case-column">
              <p class="case-label before">BEFORE</p>
              <div class="case-image-grid">
                <button
                  v-for="item in caseItem.before"
                  :key="item.id"
                  class="case-image"
                  @click="openGalleryPreview(item)"
                  :aria-label="`${item.title} - preview image`"
                >
                  <img :src="item.src" :alt="item.alt" loading="lazy" />
                  <span class="case-image-hint">View</span>
                </button>
              </div>
            </div>
            <div class="case-divider" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m5 12 14 0"/><path d="m13 6 6 6-6 6"/></svg>
            </div>
            <div class="case-column">
              <p class="case-label after">AFTER</p>
              <div class="case-image-grid">
                <button
                  v-for="item in caseItem.after"
                  :key="item.id"
                  class="case-image"
                  @click="openGalleryPreview(item)"
                  :aria-label="`${item.title} - preview image`"
                >
                  <img :src="item.src" :alt="item.alt" loading="lazy" />
                  <span class="case-image-hint">View</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <button class="gallery-btn" @click="$router.push({ name: 'gallery' })">
        {{ $t('gallery.viewAll') }}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>

    <div
      v-if="galleryPreviewItem"
      class="case-preview-lightbox"
      @click.self="galleryPreviewItem = null"
      @keydown.escape="galleryPreviewItem = null"
      tabindex="0"
    >
      <button class="case-preview-close" @click="galleryPreviewItem = null" aria-label="Close image preview">&times;</button>
      <img :src="galleryPreviewItem.src" :alt="galleryPreviewItem.alt" class="case-preview-image" />
    </div>

    <!-- Reviews Preview -->
    <section id="reviews" class="reviews-section">
      <div style="max-width:1280px;margin:0 auto">
        <div class="section-header">
          <h2>{{ $t('reviews.heading') }}</h2>
          <p>{{ $t('reviews.subheading') }}</p>
        </div>
        <div class="reviews-grid">
          <div v-for="(rev, i) in displayedReviews" :key="i" class="review-card" @click="$router.push({ name: 'reviews' })" role="button" tabindex="0" @keydown.enter="$router.push({ name: 'reviews' })">
            <div class="review-img">
              <img :src="rev.image" :alt="rev.name" loading="lazy" />
              <div class="star-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f472b6" stroke="#f472b6" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {{ rev.rating }}
              </div>
            </div>
            <div class="review-body">
              <p>"{{ rev.text }}"</p>
              <div class="review-author">
                <h4>- {{ rev.name }}</h4>
                <span>{{ rev.service }}</span>
              </div>
            </div>
          </div>
        </div>
        <button class="gallery-btn" @click="$router.push({ name: 'reviews' })">
          {{ $t('reviews.viewAll') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="contact-section">
      <div class="contact-inner">
        <div class="contact-left">
          <h2>{{ $t('contact.heading') }}</h2>
          <p>{{ $t('contact.subheading') }}</p>
          <div class="contact-item">
            <div class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.56 3.18 2 2 0 0 1 3.54 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.57a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div><h4>{{ $t('contact.phone') }}</h4><p>(701) 205-6280</p></div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div><h4>{{ $t('contact.email') }}</h4><p>contact@streamlinecleaningservices.com</p></div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div><h4>{{ $t('contact.location') }}</h4><p>{{ $t('contact.locationDetail') }}<br/>{{ $t('contact.hours') }}</p></div>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="handleContact">
          <div class="form-row" style="margin-bottom:1.5rem">
            <div class="form-group" style="margin:0">
              <label>{{ $t('contact.firstName') }}</label>
              <input type="text" v-model="contactForm.firstName" required />
            </div>
            <div class="form-group" style="margin:0">
              <label>{{ $t('contact.lastName') }}</label>
              <input type="text" v-model="contactForm.lastName" required />
            </div>
          </div>
          <div class="form-group">
            <label>{{ $t('contact.emailAddress') }}</label>
            <input type="email" v-model="contactForm.email" required />
          </div>
          <div class="form-group">
            <label>{{ $t('contact.message') }}</label>
            <textarea rows="4" v-model="contactForm.message" :placeholder="$t('contact.messagePlaceholder')" required></textarea>
          </div>
          <!-- Honeypot -->
          <input type="text" v-model="honeypot" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button type="submit" class="btn-dark" :disabled="contactSubmitting">
            {{ contactSuccess ? $t('contact.successMsg') : $t('contact.send') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { services, beforeAfterCases } from '../data/services.js';
import useReviews from '../composables/useReviews.js';
import { sanitizeInput, validateEmail } from '../utils/security.js';

const { reviews, loadReviews } = useReviews();

const reviewImageUrls = [
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_2697_fy0zuw.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_9284_ss1ngl.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170729/IMG_0706_uuzmf4.jpg'
];

const seedReviews = [
  { name: 'Sarah M.', rating: '5.0', text: 'Absolutely incredible service. My kitchen has never looked this good — they even cleaned inside the oven without me asking. Will be booking monthly from now on!', service: 'Deep Cleaning', image: reviewImageUrls[0] },
  { name: 'Jessica T.', rating: '5.0', text: 'Booking online was so easy and they showed up right on time. Professional, thorough, and friendly. My apartment sparkles after every visit!', service: 'Standard Cleaning', image: reviewImageUrls[1] },
  { name: 'David R.', rating: '4.9', text: 'Used them for a move-out clean and got my full deposit back. The landlord was shocked at how clean it was. Cannot recommend Streamline enough!', service: 'Move-Out Cleaning', image: reviewImageUrls[2] }
];

const displayedReviews = ref(seedReviews);
const galleryPreviewItem = ref(null);
const serviceBadgeUrls = {
  broom: 'https://img.icons8.com/matisse/100/broom.png',
  sparkles: 'https://img.icons8.com/hands/100/eco-cleaning.png',
  box: 'https://img.icons8.com/emoji/48/package-.png',
  building: 'https://img.icons8.com/plasticine/100/building.png'
};

onMounted(async () => {
  try {
    await loadReviews();
    if (reviews.value.length) {
      displayedReviews.value = reviews.value.slice(0, 3).map((r, index) => ({
        name: r.name,
        rating: r.rating,
        text: r.text,
        service: r.service,
        image: reviewImageUrls[index] || reviewImageUrls[reviewImageUrls.length - 1]
      }));
    }
  } catch {
    // keep seed reviews
  }
});

const contactForm = reactive({ firstName: '', lastName: '', email: '', message: '' });
const honeypot = ref('');
const contactSubmitting = ref(false);
const contactSuccess = ref(false);

const API_URL = import.meta.env?.VITE_CONTACT_API || '';

function openGalleryPreview(item) {
  galleryPreviewItem.value = item;
}

async function handleContact() {
  if (honeypot.value) return;
  const firstName = sanitizeInput(contactForm.firstName);
  const lastName = sanitizeInput(contactForm.lastName);
  const email = sanitizeInput(contactForm.email).toLowerCase();
  const message = sanitizeInput(contactForm.message);

  if (!firstName || !lastName || !validateEmail(email) || !message) return;

  contactSubmitting.value = true;
  try {
    if (API_URL) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, message })
      });
      if (!res.ok) throw new Error('Failed');
    }
    contactSuccess.value = true;
    contactForm.firstName = '';
    contactForm.lastName = '';
    contactForm.email = '';
    contactForm.message = '';
    setTimeout(() => { contactSuccess.value = false; }, 4000);
  } catch {
    alert('Failed to send message. Please try again.');
  } finally {
    contactSubmitting.value = false;
  }
}
</script>

<style scoped>
.hero { position: relative; background: #f9fafb; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: rgba(251,207,232,0.3); transform: skewY(-6deg) scale(1.1); transform-origin: top left; }
.hero-inner { max-width: 1280px; margin: 0 auto; padding: 5rem 1.5rem 6rem; display: flex; align-items: center; gap: 3rem; position: relative; z-index: 1; }
.hero-left { flex: 1; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 9999px; background: #fce7f3; color: #ec4899; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem; }
.hero-badge img { width: 24px; height: 24px; object-fit: contain; }
h1 { font-size: clamp(2.2rem, 5vw, 3.75rem); font-weight: 900; color: #1f2937; line-height: 1.15; margin-bottom: 1.5rem; }
h1 span { color: #f472b6; }
.hero-desc { font-size: 1.125rem; color: #6b7280; margin-bottom: 2rem; max-width: 560px; line-height: 1.7; }
.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-right { flex: 1; position: relative; }
.hero-img-wrap { border-radius: 1.5rem; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15); position: relative; }
.hero-img-wrap img { width: 100%; transition: transform .7s; }
.hero-img-wrap:hover img { transform: scale(1.05); }
.hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); }
.hero-badge-float { position: absolute; bottom: -1.5rem; left: -1.5rem; background: #fff; padding: 1rem; border-radius: 1rem; box-shadow: 0 8px 24px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 1rem; animation: bounce 3s infinite; }
.hero-badge-icon { background: #fce7f3; padding: 0.75rem; border-radius: 9999px; display: flex; }
.badge-title { font-size: .875rem; font-weight: 700; color: #1f2937; }
.badge-sub { font-size: .75rem; color: #6b7280; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

.services-section { padding: 6rem 1.5rem; background: #fff; }
.services-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.service-card { background: #f9fafb; border-radius: 1.5rem; padding: 2.5rem 2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 2px solid transparent; transition: all .3s; }
.service-card:hover { transform: translateY(-4px); border-color: #fbcfe8; background: #fff; box-shadow: 0 12px 24px rgba(0,0,0,0.08); }
.service-icon { width: 64px; height: 64px; background: #fce7f3; border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
.service-icon img { width: 44px; height: 44px; object-fit: contain; }
.service-card h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
.service-card p { color: #6b7280; line-height: 1.6; margin-bottom: 1.5rem; }
.service-price { font-size: 1.75rem; font-weight: 800; color: #ec4899; }
.service-price span { font-size: 0.875rem; font-weight: 500; color: #9ca3af; }

.gallery-section { padding: 6rem 1.5rem; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); }
.before-after-cases { max-width: 1400px; margin: 0 auto; display: grid; gap: 4rem; }
.before-after-case { background: transparent; padding: 0 1rem; }
.case-top { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 0.5rem; margin-bottom: 2.5rem; }
.case-top h3 { margin: 0; color: #111827; font-size: 2.2rem; font-weight: 900; letter-spacing: -0.02em; }
.case-top p { margin: 0; color: #f472b6; font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.case-columns { display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem; align-items: start; max-width: 1100px; margin: 0 auto; }
.case-divider { display: flex; flex-direction: column; align-items: center; justify-content: center; color: #cbd5e1; margin-top: 3rem; gap: 1rem; }
.case-divider::before, .case-divider::after { content: ''; width: 2px; height: 60px; background: linear-gradient(to bottom, transparent, #e2e8f0, transparent); }
.case-divider svg { background: #ffffff; color: #94a3b8; border: 2px solid #f1f5f9; border-radius: 50%; width: 48px; height: 48px; padding: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
.case-column { background: transparent; padding: 0; border: none; }
.case-label { display: block; border-radius: 9999px; padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-align: center; margin: 0 auto 1.5rem; max-width: max-content; }
.case-label.before { color: #b91c1c; background: #fee2e2; border: 1px solid #fecaca; }
.case-label.after { color: #15803d; background: #dcfce7; border: 1px solid #bbf7d0; }
.case-image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; align-items: stretch; justify-content: center; }
.case-image { border: none; padding: 0; margin: 0; border-radius: 1.25rem; overflow: hidden; cursor: pointer; background: #f1f5f9; position: relative; aspect-ratio: 4/5; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); width: 100%; }
.case-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(0.4, 0, 0.2, 1); display: block; }
.case-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.48), rgba(15, 23, 42, 0.03) 55%); opacity: 0; transition: opacity .2s; }
.case-image-hint { position: absolute; right: 0.6rem; bottom: 0.55rem; z-index: 1; color: #fff; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em; opacity: 0; transition: opacity .2s; }
.case-image:hover img { transform: scale(1.06); }
.case-image:hover::after, .case-image:hover .case-image-hint { opacity: 1; }
.case-image:focus-visible { outline: 3px solid #f472b6; outline-offset: 3px; }
.case-preview-lightbox {
  position: fixed;
  inset: 0;
  z-index: 120;
  background: rgba(2, 6, 23, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.case-preview-close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
.case-preview-image {
  width: min(900px, 92vw);
  max-height: 88vh;
  border-radius: 1rem;
  object-fit: contain;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}
.gallery-btn { display: flex; align-items: center; gap: 8px; color: #ec4899; font-weight: 700; background: none; border: none; cursor: pointer; font-size: 1rem; transition: color .2s; margin: 3rem auto 0; }
.gallery-btn:hover { color: #db2777; }

.reviews-section { padding: 6rem 1.5rem; background: #f9fafb; border-top: 1px solid #f3f4f6; }
.reviews-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.review-card { background: #fff; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #f3f4f6; display: flex; flex-direction: column; transition: transform .2s; cursor: pointer; }
.review-card:hover { transform: translateY(-4px); border-color: #fbcfe8; }
.review-img { height: 192px; position: relative; overflow: hidden; }
.review-img img { width: 100%; height: 100%; object-fit: cover; }
.star-badge { position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 9999px; display: flex; align-items: center; gap: 4px; font-size: 0.875rem; font-weight: 700; }
.review-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.review-body p { color: #4b5563; font-style: italic; margin-bottom: 1rem; line-height: 1.6; }
.review-author h4 { font-weight: 700; color: #1f2937; }
.review-author span { font-size: 0.875rem; color: #f472b6; }

.contact-section { padding: 6rem 1.5rem; background: #fff; border-top: 1px solid #f3f4f6; }
.contact-inner { max-width: 1280px; margin: 0 auto; display: flex; gap: 4rem; }
.contact-left { flex: 0 0 320px; }
.contact-left h2 { font-size: 1.875rem; font-weight: 900; color: #1f2937; margin-bottom: 1.5rem; }
.contact-left > p { color: #6b7280; margin-bottom: 2rem; }
.contact-item { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
.contact-icon { background: #fce7f3; padding: 0.75rem; border-radius: 9999px; flex-shrink: 0; display: flex; }
.contact-item h4 { font-weight: 700; color: #1f2937; margin-bottom: 4px; }
.contact-item p { color: #6b7280; font-size: 0.9rem; }
.contact-form { flex: 1; background: #f9fafb; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #f3f4f6; }

@media (max-width: 1024px) {
  .hero-inner { flex-direction: column; padding: 4rem 1.25rem 5rem; gap: 2rem; }
  .hero-right { width: 100%; margin-top: 2rem; }
  .hero-badge-float { left: 1rem; bottom: -1rem; }
  .contact-inner { flex-direction: column; }
  .contact-left { flex: none; }
}
@media (max-width: 768px) {
  .hero { border-bottom: 1px solid #f1f5f9; }
  .hero-inner { padding: 3.25rem 1rem 4rem; }
  .hero-badge { font-size: 0.8rem; padding: 6px 12px; margin-bottom: 1rem; }
  h1 { font-size: clamp(1.9rem, 9vw, 2.45rem); margin-bottom: 1rem; }
  .hero-desc { font-size: 1rem; line-height: 1.6; margin-bottom: 1.25rem; }
  .hero-btns { width: 100%; gap: 0.75rem; }
  .hero-btns :deep(a),
  .hero-btns :deep(.btn-primary) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  .hero-img-wrap { border-radius: 1.1rem; }
  .hero-img-wrap img { min-height: 280px; object-fit: cover; }
  .hero-badge-float {
    position: static;
    margin-top: 0.9rem;
    width: 100%;
    justify-content: center;
    animation: none;
  }

  .services-section,
  .gallery-section,
  .reviews-section,
  .contact-section { padding: 4rem 1rem; }

  .services-grid,
  .reviews-grid { grid-template-columns: 1fr; gap: 1.2rem; }
  .service-card { padding: 1.6rem 1.2rem; border-radius: 1.1rem; }
  .service-icon { width: 56px; height: 56px; margin-bottom: 1rem; }
  .service-icon img { width: 36px; height: 36px; }

  .before-after-cases { gap: 2.4rem; }
  .before-after-case { padding: 0; }
  .case-top { flex-direction: column; align-items: center; text-align: center; margin-bottom: 1.1rem; }
  .case-top h3 { font-size: 1.6rem; }
  .case-top p { font-size: 0.82rem; letter-spacing: 0.08em; }
  .case-columns { grid-template-columns: 1fr; }
  .case-divider { display: none; }
  .case-image-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.65rem; }
  .case-image { width: 100%; border-radius: 0.9rem; }
  .case-label { margin-bottom: 0.85rem; }
  .gallery-btn { margin-top: 2rem; }

  .review-img { height: 170px; }
  .review-body { padding: 1rem; }
  .review-body p { font-size: 0.95rem; line-height: 1.5; }

  .contact-inner { gap: 2rem; }
  .contact-left h2 { font-size: 1.55rem; margin-bottom: 1rem; }
  .contact-item { margin-bottom: 1rem; }
  .contact-item p { line-height: 1.5; }
  .contact-form { padding: 1.2rem 1rem; border-radius: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr; gap: 0.85rem; }
}

@media (max-width: 430px) {
  .hero-inner { padding: 2.8rem 0.85rem 3.4rem; }
  .hero-badge { width: 100%; justify-content: center; }
  .services-section,
  .gallery-section,
  .reviews-section,
  .contact-section { padding: 3.4rem 0.85rem; }
  .case-image-grid { grid-template-columns: 1fr; }
  .case-preview-lightbox { padding: 0.85rem; }
  .case-preview-close { width: 40px; height: 40px; top: 0.8rem; right: 0.8rem; }
}
</style>
