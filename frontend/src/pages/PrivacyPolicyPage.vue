<template>
  <div class="legal-page">
    <section class="legal-hero">
      <div class="container"><h1>{{ $t('privacy.heading') }}</h1><p>{{ $t('privacy.lastUpdated') }}</p></div>
    </section>
    <section class="legal-content container">
      <div v-for="i in 6" :key="i" class="legal-section">
        <h2>{{ $t(`privacy.section${i}Title`) }}</h2>
        <p>{{ getPrivacySectionText(i) }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const contactEmail = 'contact@streamlinecleaningservices.com';

const getPrivacySectionText = (index) => {
  if (index === 6) {
    return t('privacy.section6Text', { email: contactEmail });
  }

  return t(`privacy.section${index}Text`);
};
</script>

<style scoped>
.legal-page { background: #fff; }
.legal-hero { padding: 4rem 1.5rem 2rem; background: linear-gradient(135deg, #fce7f3, #fdf2f8); text-align: center; }
.legal-hero h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; color: #1f2937; }
.legal-hero p { margin-top: 0.5rem; color: #6b7280; }
.legal-content { max-width: 800px; padding: 3rem 1.5rem 6rem; }
.legal-section { margin-bottom: 2.5rem; }
.legal-section h2 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
.legal-section p { color: #4b5563; line-height: 1.7; }
</style>
