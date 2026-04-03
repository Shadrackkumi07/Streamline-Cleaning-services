import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import { applyPageMeta, sanitizePathname } from '../utils/security';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Streamline Cleaning Services | Professional Home & Commercial Cleaning',
      description: 'Professional, reliable, and meticulous home and commercial cleaning tailored to your lifestyle. Standard, deep, move-in/out, and commercial packages available.',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('../pages/BookingPage.vue'),
    meta: {
      title: 'Book a Cleaning',
      description: 'Schedule your professional cleaning service in minutes. Choose your service, home size, and add-ons, then pick a time that works for you.',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('../pages/ReviewsPage.vue'),
    meta: {
      title: 'Client Reviews',
      description: 'Read real reviews from satisfied Streamline Cleaning Services clients. Leave your own review after your service.',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../pages/GalleryPage.vue'),
    meta: {
      title: 'Gallery',
      description: 'Before and after photos showcasing the Streamline Cleaning Services difference. See our work across residential and commercial spaces.',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../pages/TermsPage.vue'),
    meta: {
      title: 'Terms of Service',
      description: 'Terms and conditions governing use of Streamline Cleaning Services.',
      ogType: 'website'
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../pages/PrivacyPolicyPage.vue'),
    meta: {
      title: 'Privacy Policy',
      description: 'How Streamline Cleaning Services collects, uses, and protects your personal information.',
      ogType: 'website'
    }
  },
  {
    path: '/accessibility',
    name: 'accessibility',
    component: () => import('../pages/AccessibilityPage.vue'),
    meta: {
      title: 'Accessibility Statement',
      description: 'Our commitment to making streamlinecleaning.com accessible to everyone.',
      ogType: 'website'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/AdminPage.vue'),
    meta: {
      title: 'Admin',
      description: 'Admin review management.',
      ogType: 'website',
      noIndex: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      ogType: 'website',
      noIndex: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'admin') {
    try {
      const flag = sessionStorage.getItem('sl_admin');
      if (flag === 'true') { applyPageMeta(to); next(); return; }

      const passcode = window.prompt('Enter admin passcode');
      if (!passcode) { next({ name: 'home' }); return; }

      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      if (response.ok) {
        // Store passcode only in sessionStorage so it can be used for admin API calls
        // The actual verification always happens server-side
        sessionStorage.setItem('sl_admin', 'true');
        sessionStorage.setItem('sl_admin_token', passcode);
        applyPageMeta(to); next(); return;
      }
      next({ name: 'home' }); return;
    } catch { next({ name: 'home' }); return; }
  }

  const safePath = sanitizePathname(to.fullPath);
  if (safePath !== to.fullPath) { next(safePath); return; }
  applyPageMeta(to);
  next();
});

export default router;
