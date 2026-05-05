<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-left">
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
            <img src="/cleaning.png" alt="Cleaning service in action" loading="eager" />
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

    <!-- Gallery (CTA only) -->
    <section id="gallery" class="gallery-section">
      <button class="gallery-btn" @click="$router.push({ name: 'gallery' })">
        {{ $t('gallery.viewAll') }}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
      </button>
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
import { ref, reactive } from 'vue';
import { services } from '../data/services.js';
import { sanitizeInput, validateEmail } from '../utils/security.js';

const serviceBadgeUrls = {
  broom: 'https://img.icons8.com/matisse/100/broom.png',
  sparkles: 'https://img.icons8.com/hands/100/eco-cleaning.png',
  box: 'https://img.icons8.com/emoji/48/package-.png',
  building: 'https://img.icons8.com/plasticine/100/building.png',
  calendar: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-calendar-cleaning-flaticons-flat-flat-icons.png',
  organization: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-cleaning-cleaning-flaticons-flat-flat-icons-20.png'
};

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

.gallery-section {
  padding: 6rem 1.5rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ec4899;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color .2s;
  margin: 0;
}
.gallery-btn:hover { color: #db2777; }

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

.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem; font-size: 0.9rem; }
.form-group input,
.form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 1rem; font-family: inherit; }
.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: #f472b6; box-shadow: 0 0 0 3px rgba(244, 114, 182, 0.1); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.btn-dark { padding: 0.75rem 1.5rem; background: #1f2937; color: #fff; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: background 0.2s; }
.btn-dark:hover:not(:disabled) { background: #111827; }
.btn-dark:disabled { opacity: 0.6; cursor: not-allowed; }

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
  h1 { text-align: center; }
  .hero-desc { margin-left: auto; margin-right: auto; text-align: center; }
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
  .contact-section { padding: 4rem 1.5rem; }

  .gallery-section { padding: 3rem 1.5rem; }
  .gallery-btn { font-size: 0.95rem; }
  
  .services-grid { grid-template-columns: 1fr; gap: 1.2rem; }
  .service-card { padding: 1.6rem 1.2rem; border-radius: 1.1rem; }
  .service-card h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
  .service-card p { font-size: 0.875rem; margin-bottom: 1rem; }
  .service-icon { width: 56px; height: 56px; margin-bottom: 1rem; }
  .service-icon img { width: 36px; height: 36px; }

  .contact-inner { gap: 2rem; }
  .contact-left h2 { font-size: 1.55rem; margin-bottom: 1rem; }
  .contact-item { margin-bottom: 1rem; }
  .contact-item p { line-height: 1.5; font-size: 0.85rem; }
  .contact-form { padding: 1.2rem 1.5rem; border-radius: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr; gap: 0.85rem; }
  .form-group { margin-bottom: 1rem; }
  .btn-dark { padding: 0.7rem 1.25rem; font-size: 0.9rem; }
}

@media (max-width: 430px) {
  .hero-inner { padding: 2.5rem 0.75rem 3rem; }
  .hero-inner h1 { font-size: clamp(1.6rem, 8vw, 2rem); margin-bottom: 0.75rem; }
  .hero-desc { font-size: 0.9rem; margin-bottom: 1rem; }
  .hero-btns { gap: 0.5rem; }
  .hero-btns :deep(a) { padding: 0.6rem; font-size: 0.85rem; }
  
  .services-section,
  .gallery-section,
  .contact-section { padding: 2.75rem 0.75rem; }
  
  .service-card { padding: 1.3rem 1rem; }
  .service-card h3 { font-size: 1rem; margin-bottom: 0.4rem; }
  .service-card p { font-size: 0.8rem; margin-bottom: 1rem; }
  .service-price { font-size: 1.3rem; }
  .service-icon { width: 48px; height: 48px; margin-bottom: 0.75rem; }
  .service-icon img { width: 32px; height: 32px; }
  
  .gallery-section { padding: 2.5rem 0.75rem; }
  .gallery-btn { font-size: 0.9rem; }
  
  .contact-left h2 { font-size: 1.25rem; margin-bottom: 0.75rem; }
  .contact-left > p { font-size: 0.85rem; margin-bottom: 1.25rem; }
  .contact-item { margin-bottom: 0.85rem; gap: 0.75rem; }
  .contact-icon { padding: 0.5rem; }
  .contact-item h4 { font-size: 0.95rem; }
  .contact-item p { font-size: 0.8rem; }
  
  .contact-form { padding: 0.9rem 0.75rem; }
  .form-group { margin-bottom: 0.65rem; }
  .form-group label { font-size: 0.8rem; margin-bottom: 0.3rem; }
  .form-group input,
  .form-group textarea { font-size: 0.9rem; padding: 0.6rem; }
  .form-row { gap: 0.75rem; }
  .btn-dark { padding: 0.6rem 1rem; font-size: 0.85rem; }
}
</style>
