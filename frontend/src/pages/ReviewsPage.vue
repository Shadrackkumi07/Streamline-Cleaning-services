<template>
  <div class="reviews-page">
    <section class="reviews-hero">
      <div class="container">
        <h1>{{ $t('reviews.heading') }}</h1>
        <p>{{ $t('reviews.subheading') }}</p>
        <div v-if="averageRating" class="avg-rating">
          <span class="avg-number">{{ averageRating }}</span>
          <div class="stars">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="i <= Math.round(averageRating) ? '#f472b6' : '#e5e7eb'" :stroke="i <= Math.round(averageRating) ? '#f472b6' : '#e5e7eb'" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span class="avg-count">{{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }}</span>
        </div>
      </div>
    </section>

    <section class="reviews-content">
      <div class="container">
        <!-- Filter -->
        <div class="filter-bar">
          <button
            v-for="f in filters"
            :key="f"
            class="filter-chip"
            :class="{ active: activeFilter === f }"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>

        <!-- Reviews List -->
        <div class="reviews-list">
          <div v-for="rev in filteredReviews" :key="rev.id || rev.name" class="review-card-full">
            <div class="review-header">
              <div>
                <h4>{{ rev.name }}</h4>
                <span class="review-service">{{ rev.service }}</span>
              </div>
              <div class="review-rating">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="i <= rev.rating ? '#f472b6' : '#e5e7eb'" :stroke="i <= rev.rating ? '#f472b6' : '#e5e7eb'" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
            <p class="review-text">"{{ rev.text }}"</p>
            <span class="review-date" v-if="rev.date">{{ rev.date }}</span>
          </div>
          <p v-if="!filteredReviews.length" class="no-reviews">No reviews yet for this category.</p>
        </div>

        <!-- Leave a Review -->
        <div class="leave-review-section">
          <h2>{{ $t('reviews.leaveReview') }}</h2>
          <form @submit.prevent="submitReview" class="review-form">
            <div class="form-row">
              <div class="form-group">
                <label>{{ $t('reviews.name') }}</label>
                <input type="text" v-model="newReview.name" required maxlength="50" />
              </div>
              <div class="form-group">
                <label>{{ $t('reviews.service') }}</label>
                <select v-model="newReview.service" required>
                  <option value="" disabled>Select service...</option>
                  <option v-for="svc in serviceOptions" :key="svc" :value="svc">{{ svc }}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('reviews.rating') }}</label>
              <div class="star-select">
                <button
                  v-for="i in 5"
                  :key="i"
                  type="button"
                  @click="newReview.rating = i"
                  class="star-btn"
                  :class="{ active: newReview.rating >= i }"
                  :aria-label="`Rate ${i} stars`"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" :fill="newReview.rating >= i ? '#f472b6' : '#e5e7eb'" :stroke="newReview.rating >= i ? '#f472b6' : '#e5e7eb'" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('reviews.review') }}</label>
              <textarea v-model="newReview.text" rows="4" required maxlength="500"></textarea>
            </div>
            <!-- Honeypot -->
            <input type="text" v-model="honeypot" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button type="submit" class="btn-primary" :disabled="submitting || !canSubmitReview">
              {{ reviewSuccess ? $t('reviews.successMsg') : $t('reviews.submit') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import useReviews from '../composables/useReviews.js';
import { sanitizeInput } from '../utils/security.js';
import { services } from '../data/services.js';

const { reviews, averageRating, loadReviews, addReview } = useReviews();

const serviceOptions = services.map((s) => s.name);
const filters = ['All', ...serviceOptions];
const activeFilter = ref('All');
const honeypot = ref('');
const submitting = ref(false);
const reviewSuccess = ref(false);

const newReview = reactive({ name: '', service: '', rating: 5, text: '' });

const filteredReviews = computed(() => {
  if (activeFilter.value === 'All') return reviews.value;
  return reviews.value.filter(
    (r) => r.service.toLowerCase() === activeFilter.value.toLowerCase()
  );
});

const canSubmitReview = computed(() =>
  newReview.name.trim() && newReview.service && newReview.rating && newReview.text.trim()
);

onMounted(() => { loadReviews().catch(() => {}); });

async function submitReview() {
  if (honeypot.value || !canSubmitReview.value) return;
  submitting.value = true;
  try {
    await addReview({
      name: sanitizeInput(newReview.name),
      service: sanitizeInput(newReview.service),
      rating: newReview.rating,
      text: sanitizeInput(newReview.text)
    });
    reviewSuccess.value = true;
    newReview.name = '';
    newReview.service = '';
    newReview.rating = 5;
    newReview.text = '';
    setTimeout(() => { reviewSuccess.value = false; }, 4000);
  } catch {
    alert('Failed to submit review. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.reviews-page { background: #fff; }
.reviews-hero {
  padding: 4rem 1.5rem 3rem; text-align: center;
  background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
}
.reviews-hero h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; color: #1f2937; }
.reviews-hero p { margin-top: 0.75rem; font-size: 1.125rem; color: #6b7280; }
.avg-rating { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 1.5rem; }
.avg-number { font-size: 2rem; font-weight: 900; color: #ec4899; }
.stars { display: flex; gap: 2px; }
.avg-count { font-size: 0.875rem; color: #6b7280; }

.reviews-content { padding: 3rem 1.5rem 6rem; max-width: 900px; margin: 0 auto; }
.filter-bar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
.filter-chip {
  padding: 6px 16px; border-radius: 9999px; border: 1px solid #e5e7eb;
  background: #fff; color: #4b5563; font-weight: 600; font-size: 0.85rem;
  cursor: pointer; transition: all .2s;
}
.filter-chip:hover { border-color: #f472b6; }
.filter-chip.active { background: #f472b6; color: #fff; border-color: #f472b6; }

.reviews-list { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 4rem; }
.review-card-full {
  background: #f9fafb; border-radius: 1rem; padding: 1.5rem;
  border: 1px solid #f3f4f6; transition: border-color .2s;
}
.review-card-full:hover { border-color: #fbcfe8; }
.review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.review-header h4 { font-weight: 700; color: #1f2937; }
.review-service { font-size: 0.8rem; color: #f472b6; font-weight: 500; }
.review-rating { display: flex; gap: 2px; }
.review-text { color: #4b5563; font-style: italic; line-height: 1.6; margin-bottom: 0.75rem; }
.review-date { font-size: 0.8rem; color: #9ca3af; }
.no-reviews { color: #9ca3af; text-align: center; padding: 2rem; }

.leave-review-section {
  background: #f9fafb; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #f3f4f6;
}
.leave-review-section h2 { font-size: 1.5rem; font-weight: 900; color: #1f2937; margin-bottom: 1.5rem; }
.review-form .btn-primary { width: 100%; justify-content: center; }
.star-select { display: flex; gap: 4px; }
.star-btn { background: none; border: none; cursor: pointer; padding: 2px; transition: transform .15s; }
.star-btn:hover { transform: scale(1.15); }

@media (max-width: 768px) {
  .review-header { flex-direction: column; gap: 0.5rem; }
}
</style>
