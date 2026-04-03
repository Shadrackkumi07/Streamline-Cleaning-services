import { computed, ref } from 'vue';
import { stripHTML } from '../utils/sanitizer';

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());
const REVIEWS_API = import.meta.env?.VITE_REVIEWS_API || '';

// Admin token is stored in sessionStorage after backend verification — never in env vars
const getAdminToken = () => (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('sl_admin_token') || '' : '');

const normalizeReview = (review) => {
  const ratingValue = Number(review.rating);
  const rating = Number.isFinite(ratingValue) ? Math.min(Math.max(ratingValue, 1), 5) : 0;
  return {
    ...review,
    rating,
    name: stripHTML(review.name),
    text: stripHTML(review.text),
    service: stripHTML(review.service),
    date: review.date,
    source: review.source || 'seed'
  };
};

const sortedReviews = ref([]);
const storedReviews = ref([]);

export default function useReviews() {
  const loadReviews = async () => {
    if (!REVIEWS_API) {
      sortedReviews.value = [];
      storedReviews.value = [];
      return;
    }
    const response = await fetch(REVIEWS_API);
    if (!response.ok) throw new Error('Failed to load reviews.');
    const data = await response.json();
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];
    const normalized = reviews
      .map(normalizeReview)
      .filter((r) => r.rating >= 1 && r.rating <= 5 && isValidDate(r.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    sortedReviews.value = normalized;
    storedReviews.value = normalized.filter((r) => r.source === 'user');
  };

  const filterByService = (service) =>
    computed(() =>
      !service
        ? sortedReviews.value
        : sortedReviews.value.filter((r) => r.service.toLowerCase() === service.toLowerCase())
    );

  const averageRating = computed(() => {
    if (!sortedReviews.value.length) return 0;
    const total = sortedReviews.value.reduce((sum, r) => sum + r.rating, 0);
    return Number((total / sortedReviews.value.length).toFixed(1));
  });

  const addReview = async (review) => {
    if (!REVIEWS_API) throw new Error('Reviews API is not configured.');
    const response = await fetch(REVIEWS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error('Failed to submit review.');
    await loadReviews();
  };

  const removeReview = async (id) => {
    if (!REVIEWS_API) throw new Error('Reviews API is not configured.');
    const response = await fetch(`${REVIEWS_API}/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': getAdminToken() }
    });
    if (!response.ok) throw new Error('Failed to delete review.');
    await loadReviews();
  };

  const clearStoredReviews = async () => {
    if (!REVIEWS_API) throw new Error('Reviews API is not configured.');
    const response = await fetch(REVIEWS_API, {
      method: 'DELETE',
      headers: { 'x-admin-token': getAdminToken() }
    });
    if (!response.ok) throw new Error('Failed to clear reviews.');
    await loadReviews();
  };

  return {
    reviews: sortedReviews,
    averageRating,
    filterByService,
    addReview,
    removeReview,
    clearStoredReviews,
    storedReviews,
    loadReviews
  };
}
