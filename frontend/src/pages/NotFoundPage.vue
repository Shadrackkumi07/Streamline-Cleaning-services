<template>
  <div class="not-found">
    <h1>404</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/" class="btn-primary">Go Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 60vh; text-align: center; padding: 2rem;
}
.not-found h1 { font-size: 6rem; font-weight: 900; color: #f472b6; margin-bottom: 1rem; }
.not-found p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
</style>
