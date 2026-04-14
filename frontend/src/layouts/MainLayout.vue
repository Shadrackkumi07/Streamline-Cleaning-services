<template>
  <div class="app-layout">
    <a href="#main-content" class="sr-only">Skip to main content</a>

    <nav>
      <div class="nav-inner">
        <router-link to="/" class="logo">
          <img src="/logo.png" alt="Streamline Cleaning Services logo" class="logo-img" width="48" height="48" />
          <div class="logo-text">
            <span class="logo-name">STREAMLINE</span>
            <span class="logo-tagline">Clean Spaces, Clear Minds.</span>
          </div>
        </router-link>

        <div class="nav-links">
          <router-link to="/#services">{{ $t('nav.services') }}</router-link>
          <router-link :to="{ name: 'booking' }">{{ $t('nav.booking') }}</router-link>
          <router-link to="/#gallery">{{ $t('nav.gallery') }}</router-link>
          <router-link to="/#reviews">{{ $t('nav.reviews') }}</router-link>
          <router-link to="/#contact">{{ $t('nav.contact') }}</router-link>
        </div>

        <button class="btn-pink nav-cta" @click="$router.push({ name: 'booking' })">
          {{ $t('nav.schedule') }}
        </button>

        <div class="nav-right-group">
          <select class="lang-select" :value="locale" @change="switchLocale($event.target.value)" aria-label="Language">
            <option v-for="l in supportedLocales" :key="l.code" :value="l.code">{{ l.label }}</option>
          </select>
          <div class="built-by">
            <span>Built by <strong>Shark Labs</strong></span>
            <span class="divider">•</span>
            <span>Let's connect</span>
            <a href="https://www.linkedin.com/in/shadrack-kumi-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <button class="hamburger" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Close menu' : 'Open menu'">
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="mobile-menu" v-if="menuOpen">
        <div class="mobile-menu-inner">
          <router-link to="/#services" @click="menuOpen = false">{{ $t('nav.services') }}</router-link>
          <router-link :to="{ name: 'booking' }" @click="menuOpen = false">{{ $t('nav.booking') }}</router-link>
          <router-link to="/#gallery" @click="menuOpen = false">{{ $t('nav.gallery') }}</router-link>
          <router-link to="/#reviews" @click="menuOpen = false">{{ $t('nav.reviews') }}</router-link>
          <router-link to="/#contact" @click="menuOpen = false">{{ $t('nav.contact') }}</router-link>
          <select class="lang-select mobile-lang" :value="locale" @change="switchLocale($event.target.value)" aria-label="Language">
            <option v-for="l in supportedLocales" :key="l.code" :value="l.code">{{ l.label }}</option>
          </select>
          <button class="btn-pink" style="width:100%;margin-top:0.5rem" @click="menuOpen = false; $router.push({ name: 'booking' })">
            {{ $t('nav.schedule') }}
          </button>
          <div class="built-by mobile-built-by">
            <span>Built by <strong>Shark Labs</strong></span>
            <span class="divider">•</span>
            <span>Let's connect</span>
            <a href="https://www.linkedin.com/in/shadrack-kumi-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main id="main-content">
      <router-view />
    </main>

    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">
              <img src="/logo.png" alt="Streamline" width="32" height="32" class="footer-logo-img" />
              <span>STREAMLINE</span>
            </div>
            <p class="footer-desc">{{ $t('footer.tagline') }}</p>
          </div>
          <div class="footer-col">
            <h4>{{ $t('footer.quickLinks') }}</h4>
            <ul>
              <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
              <li><router-link to="/#services">{{ $t('nav.services') }}</router-link></li>
              <li><router-link :to="{ name: 'booking' }">{{ $t('nav.booking') }}</router-link></li>
              <li><router-link to="/#gallery">{{ $t('nav.gallery') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>{{ $t('footer.hoursTitle') }}</h4>
            <div class="hours-row"><span>{{ $t('footer.monFri') }}</span><span>{{ $t('footer.monFriTime') }}</span></div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-bottom-info">
            <p>{{ $t('footer.rights', { year: currentYear }) }}</p>
            <div class="footer-built-by">
              <span>Built by <strong>Shark Labs</strong></span>
              <span class="footer-divider">•</span>
              <span>Let's connect</span>
              <a href="https://www.linkedin.com/in/shadrack-kumi-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-links">
            <router-link :to="{ name: 'terms' }">{{ $t('footer.terms') }}</router-link>
            <router-link :to="{ name: 'privacy' }">{{ $t('footer.privacy') }}</router-link>
            <router-link :to="{ name: 'accessibility' }">{{ $t('footer.accessibility') }}</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadLocale, supportedLocales } from '../i18n/index.js';

const { locale } = useI18n();
const menuOpen = ref(false);
const currentYear = computed(() => new Date().getFullYear());

const switchLocale = async (code) => {
  await loadLocale(code);
  menuOpen.value = false;
};
</script>

<style scoped>
nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.9); backdrop-filter: blur(12px);
  border-bottom: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.nav-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 1.5rem;
  display: flex; justify-content: space-between; align-items: center; height: 80px;
}
.logo { display: flex; align-items: center; gap: 12px; }
.logo-img { width: 48px; height: 48px; object-fit: contain; }
.logo-text { display: flex; flex-direction: column; }
.logo-name { font-size: 1.25rem; font-weight: 800; letter-spacing: 0.15em; color: #374151; line-height: 1; }
.logo-tagline { font-size: 10px; letter-spacing: 0.15em; color: #f472b6; font-weight: 500; margin-top: 4px; text-transform: uppercase; }
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { color: #4b5563; font-weight: 500; transition: color .2s; }
.nav-links a:hover, .nav-links a.router-link-active { color: #f472b6; }
.nav-cta { display: inline-block; }
.nav-right-group { display: flex; align-items: center; gap: 0.75rem; }
.lang-select {
  padding: 4px 8px; border-radius: 6px; border: 1px solid #e5e7eb;
  font-size: 0.8rem; color: #4b5563; background: #fff; cursor: pointer;
}
.built-by {
  font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.5rem;
  white-space: nowrap; margin-left: 0.75rem; padding-left: 0.75rem; border-left: 1px solid #e5e7eb;
}
.built-by strong { color: #374151; font-weight: 600; }
.divider { color: #d1d5db; }
.built-by a {
  color: #0077b5; display: inline-flex; transition: opacity 0.2s; align-items: center;
}
.built-by a:hover { opacity: 0.8; }
.hamburger { display: none; background: none; border: none; cursor: pointer; color: #4b5563; }
.mobile-menu {
  display: none; background: #fff; border-top: 1px solid #f3f4f6;
  position: absolute; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.mobile-menu-inner { padding: 0.5rem 1rem 1.5rem; }
.mobile-menu a {
  display: block; padding: 0.75rem 1rem; font-weight: 500;
  color: #374151; border-radius: 6px; margin: 2px 0;
}
.mobile-menu a:hover { color: #f472b6; background: #fdf2f8; }
.mobile-lang { width: 100%; margin-top: 0.5rem; }
.mobile-built-by {
  display: flex !important; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;
  border-left: none; margin-left: 0;
  justify-content: center; font-size: 0.75rem; color: #6b7280; white-space: normal; text-align: center;
}

footer {
  background: #1f2937; padding: 4rem 1.5rem 2rem; margin-top: auto;
}
.footer-inner { max-width: 1280px; margin: 0 auto; }
.footer-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 3rem; margin-bottom: 3rem;
}
.footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
.footer-logo-img { width: 32px; height: 32px; object-fit: contain; filter: brightness(10); }
.footer-logo span { font-size: 1.25rem; font-weight: 800; letter-spacing: 0.15em; color: #fff; }
.footer-desc { color: #9ca3af; font-size: 0.875rem; line-height: 1.6; }
.footer-col h4 { color: #fff; font-weight: 700; margin-bottom: 1.5rem; }
.footer-col ul { list-style: none; }
.footer-col ul li { margin-bottom: 0.75rem; }
.footer-col ul li a { color: #9ca3af; font-size: 0.875rem; transition: color .2s; }
.footer-col ul li a:hover { color: #f472b6; }
.hours-row {
  display: flex; justify-content: space-between; padding-bottom: 0.5rem;
  margin-bottom: 0.75rem; border-bottom: 1px solid #374151; font-size: 0.875rem;
}
.hours-row span:first-child { color: #9ca3af; }
.hours-row span:last-child { color: #fff; }
.hours-row.closed span:last-child { color: #f472b6; }
.footer-bottom {
  border-top: 1px solid #374151; padding-top: 2rem;
  display: flex; justify-content: space-between; align-items: flex-end;
}
.footer-bottom-info { display: flex; flex-direction: column; gap: 0.75rem; }
.footer-bottom-info p { color: #6b7280; font-size: 0.875rem; margin: 0; }
.footer-built-by {
  font-size: 0.875rem; color: #9ca3af; display: flex; align-items: center; gap: 0.5rem;
}
.footer-built-by strong { color: #d1d5db; font-weight: 600; }
.footer-divider { color: #4b5563; }
.footer-built-by a {
  color: #0077b5; display: inline-flex; transition: opacity 0.2s; align-items: center;
}
.footer-built-by a:hover { opacity: 0.8; }
.footer-links { display: flex; gap: 1.5rem; align-items: center; }
.footer-links a { color: #6b7280; font-size: 0.875rem; transition: color .2s; }
.footer-links a:hover { color: #f472b6; }

@media (max-width: 1024px) {
  .nav-cta { display: none; }
  .built-by { display: none; }
}
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: block; }
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; align-items: center; }
  .footer-built-by { justify-content: center; flex-wrap: wrap; }
}
</style>
