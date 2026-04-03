<template>
  <div class="legal-page">
    <section class="legal-hero">
      <div class="container"><h1>{{ $t('accessibility.heading') }}</h1></div>
    </section>
    <section class="legal-content container">
      <p class="intro">{{ $t('accessibility.intro') }}</p>

      <div class="legal-section">
        <h2>{{ $t('accessibility.standards') }}</h2>
        <p>{{ $t('accessibility.standardsText') }}</p>
      </div>

      <div class="legal-section">
        <h2>{{ $t('accessibility.measures') }}</h2>
        <ul>
          <li v-for="i in 6" :key="i">{{ $t(`accessibility.measure${i}`) }}</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>{{ $t('accessibility.feedback') }}</h2>
        <p>{{ $t('accessibility.feedbackText') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal-page { background: #fff; }
.legal-hero { padding: 4rem 1.5rem 2rem; background: linear-gradient(135deg, #fce7f3, #fdf2f8); text-align: center; }
.legal-hero h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; color: #1f2937; }
.legal-content { max-width: 800px; padding: 3rem 1.5rem 6rem; }
.intro { color: #4b5563; line-height: 1.7; margin-bottom: 2.5rem; font-size: 1.05rem; }
.legal-section { margin-bottom: 2.5rem; }
.legal-section h2 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
.legal-section p { color: #4b5563; line-height: 1.7; }
.legal-section ul { padding-left: 1.5rem; color: #4b5563; line-height: 2; }
</style>
