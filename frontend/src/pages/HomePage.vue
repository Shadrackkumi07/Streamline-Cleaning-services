<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
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
            <svg v-if="svc.icon === 'broom'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M2.5 21h19"/><path d="M8.5 7A3.5 3.5 0 0 0 5 10.5V21"/><path d="M15.5 7A3.5 3.5 0 0 1 19 10.5V21"/><path d="M12 2v19"/></svg>
            <svg v-else-if="svc.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <svg v-else-if="svc.icon === 'box'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
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
      <div class="gallery-grid">
        <div
          v-for="item in galleryItems"
          :key="item.id"
          class="gallery-item"
          :class="{ tall: item.tall }"
          @click="$router.push({ name: 'gallery' })"
          role="button"
          tabindex="0"
          @keydown.enter="$router.push({ name: 'gallery' })"
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
      <button class="gallery-btn" @click="$router.push({ name: 'gallery' })">
        {{ $t('gallery.viewAll') }}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>

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
            <div><h4>{{ $t('contact.phone') }}</h4><p>(555) 123-4567</p></div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div><h4>{{ $t('contact.email') }}</h4><p>hello@streamlinecleaning.com</p></div>
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
import { services, galleryItems } from '../data/services.js';
import useReviews from '../composables/useReviews.js';
import { sanitizeInput, validateEmail } from '../utils/security.js';

const { reviews, loadReviews } = useReviews();

const seedReviews = [
  { name: 'Sarah M.', rating: '5.0', text: 'Absolutely incredible service. My kitchen has never looked this good — they even cleaned inside the oven without me asking. Will be booking monthly from now on!', service: 'Deep Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { name: 'Jessica T.', rating: '5.0', text: 'Booking online was so easy and they showed up right on time. Professional, thorough, and friendly. My apartment sparkles after every visit!', service: 'Standard Cleaning', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { name: 'David R.', rating: '4.9', text: 'Used them for a move-out clean and got my full deposit back. The landlord was shocked at how clean it was. Cannot recommend Streamline enough!', service: 'Move-Out Cleaning', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

const displayedReviews = ref(seedReviews);

onMounted(async () => {
  try {
    await loadReviews();
    if (reviews.value.length) {
      displayedReviews.value = reviews.value.slice(0, 3).map((r) => ({
        name: r.name,
        rating: r.rating,
        text: r.text,
        service: r.service,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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
.service-icon { width: 56px; height: 56px; background: #fce7f3; color: #f472b6; border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
.service-card h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
.service-card p { color: #6b7280; line-height: 1.6; margin-bottom: 1.5rem; }
.service-price { font-size: 1.75rem; font-weight: 800; color: #ec4899; }
.service-price span { font-size: 0.875rem; font-weight: 500; color: #9ca3af; }

.gallery-section { padding: 6rem 1.5rem; background: #fff; }
.gallery-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 250px; gap: 1.5rem; }
.gallery-item { border-radius: 1.5rem; overflow: hidden; position: relative; background: #f3f4f6; cursor: pointer; }
.gallery-item.tall { grid-row: span 2; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); opacity: 0; transition: opacity .3s; display: flex; align-items: flex-end; padding: 1.5rem; }
.gallery-item:hover .gallery-overlay { opacity: 1; }
.gallery-overlay-text p { color: #fff; font-weight: 700; font-size: 1.125rem; }
.gallery-overlay-text span { color: #fbcfe8; font-size: 0.875rem; font-weight: 500; }
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
  .hero-inner { flex-direction: column; }
  .hero-right { width: 100%; margin-top: 2rem; }
  .contact-inner { flex-direction: column; }
  .contact-left { flex: none; }
}
@media (max-width: 768px) {
  .reviews-grid, .services-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
  .gallery-item.tall { grid-row: span 1; }
}
</style>
