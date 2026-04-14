import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import { applyPageMeta, sanitizePathname } from '../utils/security';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'House Cleaning in North Dakota & Minnesota',
      description: 'Trusted home and commercial cleaning in North Dakota and Minnesota. Book standard, deep, move-in/out, and commercial cleaning online in minutes.',
      keywords: 'fargo cleaning services, west fargo cleaning services, house cleaning fargo, house cleaning west fargo, deep cleaning services, move out cleaning, commercial cleaning',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('../pages/BookingPage.vue'),
    meta: {
      title: 'Book a Cleaning Appointment',
      description: 'Book cleaning services online for homes and businesses in North Dakota and Minnesota. Select service type, details, and your preferred schedule.',
      keywords: 'book cleaning fargo, book cleaning west fargo, schedule house cleaning fargo, schedule house cleaning west fargo, north dakota cleaners, minnesota cleaners',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('../pages/ReviewsPage.vue'),
    meta: {
      title: 'Cleaning Service Reviews',
      description: 'Read verified customer reviews for Streamline Cleaning Services across North Dakota and Minnesota.',
      keywords: 'fargo cleaning reviews, west fargo cleaning reviews, cleaning service reviews, house cleaner reviews, north dakota cleaning reviews, minnesota cleaning reviews',
      ogType: 'website',
      ogImage: 'https://streamlinecleaning.com/logo.png'
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../pages/GalleryPage.vue'),
    meta: {
      title: 'Before and After Cleaning Gallery',
      description: 'Explore before and after cleaning photos from real residential and commercial cleaning jobs completed by Streamline Cleaning Services.',
      keywords: 'fargo cleaning gallery, west fargo cleaning gallery, cleaning gallery, before and after cleaning photos, deep cleaning results, move out cleaning photos',
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
      keywords: 'cleaning terms of service, booking terms, service policies',
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
      keywords: 'privacy policy, cleaning service privacy, customer data privacy',
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
      keywords: 'accessibility statement, wcag compliance, accessible cleaning website',
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
      keywords: 'admin',
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
      keywords: '404',
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
