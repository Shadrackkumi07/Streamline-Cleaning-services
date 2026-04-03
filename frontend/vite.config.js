import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Allow local uploaded images from the backend dev server
  "img-src 'self' data: https://images.unsplash.com http://localhost:5000",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Allow backend API calls in dev; production _headers will add the Render URL
  "connect-src 'self' ws: wss: http://localhost:5173 http://localhost:5000",
  "frame-src 'self' https://calendly.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  'upgrade-insecure-requests'
].join('; ');

const securityHeaders = {
  'Content-Security-Policy': csp,
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue()
    ],
    server: {
      headers: securityHeaders
    },
    preview: {
      headers: securityHeaders
    },
    resolve: {
      alias: {
        src: resolve(process.cwd(), 'src')
      }
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'vue-i18n']
          }
        }
      }
    }
  };
});
