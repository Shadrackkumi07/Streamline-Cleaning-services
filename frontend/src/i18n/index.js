import { createI18n } from 'vue-i18n';
import en from './locales/en.js';
import enGB from './locales/en-GB.js';
import es from './locales/es.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import ptBR from './locales/pt-BR.js';
import zh from './locales/zh.js';

// All locales are statically imported so the @intlify/unplugin-vue-i18n plugin
// can pre-compile every message at build time — no eval() / new Function() at runtime.
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    'en-GB': enGB,
    es,
    fr,
    de,
    'pt-BR': ptBR,
    zh
  }
});

export async function loadLocale(locale) {
  // Messages are already loaded — just switch the active locale
  i18n.global.locale.value = locale;
  document.documentElement.setAttribute('lang', locale.split('-')[0]);
}

export const supportedLocales = [
  { code: 'en', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt-BR', label: 'Português (BR)' },
  { code: 'zh', label: '中文' }
];

export default i18n;
