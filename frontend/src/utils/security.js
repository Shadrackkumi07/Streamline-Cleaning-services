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

  const normalizePath = (p) => {
    if (!p) return '/';
    const cleanPath = p.split('?')[0].split('#')[0];
    if (cleanPath === '' || cleanPath === '/') return '/';
    return cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
  };

  const canonicalPath = normalizePath(route?.path || window.location.pathname);
  const canonicalUrl = `${window.location.origin}${canonicalPath === '/' ? '/' : canonicalPath}`;

  const ogImage = route.meta?.ogImage || `${window.location.origin}/logo.png`;

  ensureMeta('name', 'description', description);
  ensureMeta('name', 'robots', route.meta?.noIndex ? 'noindex, nofollow' : 'index, follow');
  ensureMeta('property', 'og:title', pageTitle);
  ensureMeta('property', 'og:description', description);
  ensureMeta('property', 'og:type', route.meta?.ogType || 'website');
  ensureMeta('property', 'og:url', canonicalUrl);
  ensureMeta('property', 'og:image', ogImage);
  ensureMeta('property', 'og:image:width', '400');
  ensureMeta('property', 'og:image:height', '400');
  ensureMeta('property', 'og:image:alt', 'Streamline Cleaning Services logo');
  ensureMeta('property', 'og:site_name', 'Streamline Cleaning Services');

  ensureMeta('name', 'twitter:card', 'summary');
  ensureMeta('name', 'twitter:title', pageTitle);
  ensureMeta('name', 'twitter:description', description);
  ensureMeta('name', 'twitter:image', ogImage);

  ensureLink('canonical', canonicalUrl);
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
