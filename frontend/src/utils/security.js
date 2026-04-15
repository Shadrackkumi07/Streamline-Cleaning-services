import DOMPurify from 'dompurify';

const emailPattern =
  /^(?:[a-zA-Z0-9_'^&+`{|}~-]+(?:\.[a-zA-Z0-9_'^&+`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const phoneDigits = /\D+/g;

export function encodeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizeInput(value = '') {
  const clean = String(value)
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/on\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return DOMPurify.sanitize(clean, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

export function validateEmail(email = '') {
  return emailPattern.test(String(email).trim().toLowerCase());
}

export function normalizePhone(phone = '') {
  return String(phone).replace(phoneDigits, '').slice(-10);
}

export function validatePhone(phone = '') {
  return normalizePhone(phone).length === 10;
}

export function formatPhone(phone = '') {
  const digits = normalizePhone(phone);
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function generateCsrfToken() {
  const array = new Uint32Array(8);
  crypto.getRandomValues(array);
  return Array.from(array, (num) => num.toString(16)).join('');
}

export function sanitizePathname(path = '') {
  return path.replace(/[^/a-zA-Z0-9-_?&=#.%]/g, '');
}

export function applyPageMeta(route) {
  if (typeof document === 'undefined') return;
  const titleBase = 'Streamline Cleaning Services';
  const rawTitle = route.meta?.title;
  const pageTitle = rawTitle
    ? rawTitle === titleBase ? titleBase : `${rawTitle} | ${titleBase}`
    : titleBase;
  const description = route.meta?.description || 'Professional cleaning services tailored to your lifestyle.';
  const defaultKeywords = 'cleaning services, house cleaning, deep cleaning, move out cleaning, commercial cleaning, fargo cleaning, west fargo cleaning, north dakota cleaning, minnesota cleaning';
  const keywords = route.meta?.keywords || defaultKeywords;
  const robotsDirectives = route.meta?.noIndex
    ? 'noindex, nofollow, noarchive'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  document.title = pageTitle;

  const ensureMeta = (attr, key, content) => {
    let tag = document.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', encodeHTML(content));
  };

  const ensureLink = (rel, href) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  const ensureJsonLd = (id, schema) => {
    let script = document.querySelector(`script#${id}[type="application/ld+json"]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  };

  const normalizePath = (p) => {
    if (!p) return '/';
    const cleanPath = p.split('?')[0].split('#')[0];
    if (cleanPath === '' || cleanPath === '/') return '/';
    return cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
  };

  const siteOrigin = String(import.meta.env?.VITE_SITE_URL || 'https://streamlinecleaning.com').replace(/\/+$/, '');
  const canonicalPath = normalizePath(route?.fullPath || window.location.pathname);
  const canonicalUrl = `${siteOrigin}${canonicalPath === '/' ? '/' : canonicalPath}`;

  const ogImage = route.meta?.ogImage || `${siteOrigin}/logo.png`;
  const htmlLang = (document.documentElement.getAttribute('lang') || 'en').replace('_', '-');
  const locale = htmlLang.toLowerCase();
  const ogLocale = locale.includes('-')
    ? locale.replace('-', '_')
    : `${locale}_${locale.toUpperCase()}`;
  const routeName = String(route?.name || 'home');
  const routeLabelMap = {
    home: 'Home',
    booking: 'Book a Cleaning',
    reviews: 'Client Reviews',
    gallery: 'Gallery',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    accessibility: 'Accessibility Statement'
  };
  const routeTypeMap = {
    home: 'WebPage',
    booking: 'Service',
    reviews: 'CollectionPage',
    gallery: 'CollectionPage',
    terms: 'WebPage',
    privacy: 'WebPage',
    accessibility: 'WebPage'
  };
  const routeLabel = routeLabelMap[routeName] || 'Page';
  const routeSchemaType = routeTypeMap[routeName] || 'WebPage';

  ensureMeta('name', 'description', description);
  ensureMeta('name', 'keywords', keywords);
  ensureMeta('name', 'robots', robotsDirectives);
  ensureMeta('name', 'googlebot', robotsDirectives);
  ensureMeta('name', 'bingbot', robotsDirectives);
  ensureMeta('property', 'og:title', pageTitle);
  ensureMeta('property', 'og:description', description);
  ensureMeta('property', 'og:type', route.meta?.ogType || 'website');
  ensureMeta('property', 'og:url', canonicalUrl);
  ensureMeta('property', 'og:image', ogImage);
  ensureMeta('property', 'og:image:secure_url', ogImage);
  ensureMeta('property', 'og:locale', ogLocale);
  ensureMeta('property', 'og:image:width', '400');
  ensureMeta('property', 'og:image:height', '400');
  ensureMeta('property', 'og:image:type', 'image/png');
  ensureMeta('property', 'og:image:alt', 'Streamline Cleaning Services logo');
  ensureMeta('property', 'og:site_name', 'Streamline Cleaning Services');

  ensureMeta('name', 'twitter:card', 'summary_large_image');
  ensureMeta('name', 'twitter:title', pageTitle);
  ensureMeta('name', 'twitter:description', description);
  ensureMeta('name', 'twitter:image', ogImage);
  ensureMeta('name', 'twitter:image:alt', 'Streamline Cleaning Services logo');
  ensureMeta('name', 'twitter:url', canonicalUrl);

  ensureLink('canonical', canonicalUrl);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': routeSchemaType,
    '@id': `${canonicalUrl}#webpage`,
    name: pageTitle,
    description,
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: {
      '@id': `${siteOrigin}/#website`
    },
    about: {
      '@id': `${siteOrigin}/#business`
    }
  };

  if (routeName === 'booking') {
    pageSchema.potentialAction = {
      '@type': 'ReserveAction',
      target: canonicalUrl,
      name: 'Book a Cleaning Appointment'
    };
  }

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteOrigin}/`
    }
  ];

  if (canonicalPath !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: routeLabel,
      item: canonicalUrl
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };

  ensureJsonLd('route-webpage-schema', pageSchema);
  ensureJsonLd('route-breadcrumb-schema', breadcrumbSchema);
}

export function enforceHttps() {
  if (typeof window === 'undefined') return;
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  if (isLocalhost) return; // never redirect on local dev — prevents chrome-error:// frame issues
  const httpsOnly = import.meta.env?.VITE_HTTPS_ONLY === 'true';
  const isProd = import.meta.env?.PROD;
  if ((httpsOnly || isProd) && window.location.protocol === 'http:') {
    window.location.replace(window.location.href.replace('http:', 'https:'));
  }
}
