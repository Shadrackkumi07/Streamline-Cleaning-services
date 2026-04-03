<template>
  <div class="booking-page">
    <section class="booking-hero">
      <div class="container">
        <h1>{{ $t('booking.heading') }}</h1>
        <p>{{ $t('booking.subheading') }}</p>
      </div>
    </section>

    <section class="booking-content">
      <div class="booking-wrap">
        <div class="booking-card">

          <!-- 3-Step Progress Bar -->
          <div class="progress-bar">
            <div class="progress-step" :class="{ active: step === 1, done: step > 1 }">
              {{ $t('booking.step1') }}
            </div>
            <div class="progress-step" :class="{ active: step === 2, done: step > 2 }">
              {{ $t('booking.step2') }}
            </div>
            <div class="progress-step" :class="{ active: step === 3 }">
              {{ $t('booking.step3') }}
            </div>
          </div>

          <div class="booking-body">

            <!-- ─── Step 1: Service + Home Details ─── -->
            <div v-if="step === 1">
              <h3>{{ $t('booking.selectService') }}</h3>

              <!-- Service Type Radio Cards -->
              <div class="service-grid">
                <label
                  v-for="svc in services"
                  :key="svc.id"
                  class="service-card-radio"
                  :class="{ selected: selectedService === svc.name }"
                >
                  <input type="radio" name="service" :value="svc.name" v-model="selectedService" />
                  <span class="svc-name">{{ svc.name }}</span>
                </label>
              </div>

              <!-- Home Details Sub-heading -->
              <h4 class="sub-heading">{{ $t('booking.homeDetails') }}</h4>

              <!-- Square Footage (full-width stepper) -->
              <div class="form-group">
                <label>{{ $t('booking.squareFootage') }}</label>
                <div class="stepper-group">
                  <button type="button" class="stepper-btn" @click="sqft = Math.max(100, sqft - 100)" aria-label="Decrease">−</button>
                  <input
                    type="number" class="stepper-input wide"
                    v-model.number="sqft" min="100" max="20000" step="100"
                    @blur="clamp('sqft', 100, 20000)"
                  />
                  <button type="button" class="stepper-btn" @click="sqft = Math.min(20000, sqft + 100)" aria-label="Increase">+</button>
                  <span class="stepper-unit">sq ft</span>
                </div>
              </div>

              <!-- Bedrooms / Bathrooms / Floors — 3-column steppers -->
              <div class="stepper-row">
                <div class="form-group">
                  <label>{{ $t('booking.bedrooms') }}</label>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" @click="bedrooms = Math.max(0, bedrooms - 1)" aria-label="Decrease">−</button>
                    <input type="number" class="stepper-input" v-model.number="bedrooms" min="0" max="20" @blur="clamp('bedrooms', 0, 20)" />
                    <button type="button" class="stepper-btn" @click="bedrooms = Math.min(20, bedrooms + 1)" aria-label="Increase">+</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>{{ $t('booking.bathrooms') }}</label>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" @click="bathrooms = Math.max(1, bathrooms - 1)" aria-label="Decrease">−</button>
                    <input type="number" class="stepper-input" v-model.number="bathrooms" min="1" max="20" @blur="clamp('bathrooms', 1, 20)" />
                    <button type="button" class="stepper-btn" @click="bathrooms = Math.min(20, bathrooms + 1)" aria-label="Increase">+</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>{{ $t('booking.floors') }}</label>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" @click="floors = Math.max(1, floors - 1)" aria-label="Decrease">−</button>
                    <input type="number" class="stepper-input" v-model.number="floors" min="1" max="10" @blur="clamp('floors', 1, 10)" />
                    <button type="button" class="stepper-btn" @click="floors = Math.min(10, floors + 1)" aria-label="Increase">+</button>
                  </div>
                </div>
              </div>

              <!-- Cleaning Frequency -->
              <div class="form-group">
                <label>{{ $t('booking.frequency') }}</label>
                <select v-model="frequency">
                  <option v-for="opt in frequencyOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>

              <!-- Add-ons -->
              <div class="form-group">
                <label>{{ $t('booking.addOns') }} <span class="optional-label">(Optional)</span></label>
                <div class="checkbox-grid">
                  <label v-for="addon in addOns" :key="addon" class="checkbox-item">
                    <input type="checkbox" :value="addon" v-model="selectedAddOns" />
                    {{ addon }}
                  </label>
                </div>
              </div>

              <div class="booking-footer">
                <button class="btn-continue" :disabled="!selectedService" @click="step = 2">
                  {{ $t('booking.continue') }}
                </button>
              </div>
            </div>

            <!-- ─── Step 2: Contact Details ─── -->
            <div v-if="step === 2">
              <h3>{{ $t('booking.detailsTitle') }}</h3>

              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('contact.firstName') }}</label>
                  <input type="text" v-model="contactForm.firstName" maxlength="50" autocomplete="given-name" />
                </div>
                <div class="form-group">
                  <label>{{ $t('contact.lastName') }}</label>
                  <input type="text" v-model="contactForm.lastName" maxlength="50" autocomplete="family-name" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('contact.emailAddress') }}</label>
                  <input type="email" v-model="contactForm.email" maxlength="200" autocomplete="email" />
                </div>
                <div class="form-group">
                  <label>{{ $t('booking.phone') }}</label>
                  <input type="tel" v-model="contactForm.phone" maxlength="20" placeholder="(555) 000-0000" autocomplete="tel" />
                </div>
              </div>

              <div class="form-group">
                <label>{{ $t('booking.notes') }} <span class="optional-label">(Optional)</span></label>
                <textarea v-model="contactForm.notes" rows="3" :placeholder="$t('booking.notesPlaceholder')" maxlength="800"></textarea>
              </div>

              <!-- Honeypot -->
              <input type="text" v-model="honeypot" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true" />

              <p v-if="submitError" class="submit-error">{{ submitError }}</p>

              <div class="booking-footer">
                <button class="btn-back" @click="step = 1">{{ $t('booking.back') }}</button>
                <button class="btn-continue" :disabled="!canProceedStep2 || submitting" @click="submitAndSchedule">
                  <span v-if="submitting">Sending…</span>
                  <span v-else>{{ $t('booking.sendAndSchedule') }}</span>
                </button>
              </div>
            </div>

            <!-- ─── Step 3: Schedule (Calendly) ─── -->
            <div v-if="step === 3">
              <h3>{{ $t('booking.scheduleTitle') }}</h3>
              <p class="schedule-desc">{{ $t('booking.scheduleDesc') }}</p>

              <!-- Booking Summary Chips -->
              <div class="selection-summary">
                <span class="summary-chip">{{ selectedService }}</span>
                <span class="summary-chip">{{ sqft.toLocaleString() }} sq ft</span>
                <span class="summary-chip">{{ bedrooms }} bed{{ bedrooms === 1 ? '' : 's' }}</span>
                <span class="summary-chip">{{ bathrooms }} bath{{ bathrooms === 1 ? '' : 's' }}</span>
                <span class="summary-chip">{{ floors }} floor{{ floors === 1 ? '' : 's' }}</span>
                <span class="summary-chip">{{ frequency }}</span>
                <span v-for="a in selectedAddOns" :key="a" class="summary-chip addon-chip">{{ a }}</span>
              </div>

              <iframe
                v-if="calendlyUrl"
                class="calendly-frame"
                :src="calendlyIframeSrc"
                :title="$t('booking.scheduleTitle')"
                frameborder="0"
              ></iframe>
              <div v-else class="calendly-placeholder">
                <p>Calendly scheduling is not configured yet. Please set the <code>VITE_CALENDLY_URL</code> environment variable.</p>
              </div>

              <div class="booking-footer">
                <button class="btn-back" @click="step = 2">{{ $t('booking.back') }}</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { services, addOns } from '../data/services.js';

const route = useRoute();
const calendlyUrl = import.meta.env?.VITE_CALENDLY_URL || '';
const apiBase = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

// ── Step state ──
const step = ref(1);

// ── Step 1 fields ──
const selectedService = ref(route.query.service || '');
const sqft = ref(1200);
const bedrooms = ref(2);
const bathrooms = ref(1);
const floors = ref(1);
const frequency = ref('One-Time Visit');
const selectedAddOns = ref([]);

const frequencyOptions = [
  { value: 'One-Time Visit', label: 'One-Time Visit' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Bi-Weekly', label: 'Bi-Weekly (Every 2 Weeks)' },
  { value: 'Monthly', label: 'Monthly' }
];

// Clamp stepper fields on manual input blur
const stepperRefs = { sqft, bedrooms, bathrooms, floors };
function clamp(field, min, max) {
  const v = Number(stepperRefs[field].value);
  stepperRefs[field].value = Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min;
}

// ── Step 2 fields ──
const contactForm = reactive({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
const honeypot = ref('');
const submitting = ref(false);
const submitError = ref('');

// ── Computed ──
const canProceedStep2 = computed(() =>
  contactForm.firstName.trim().length > 0 &&
  contactForm.lastName.trim().length > 0 &&
  contactForm.email.trim().includes('@') &&
  contactForm.phone.trim().length > 0
);

const calendlyIframeSrc = computed(() => {
  if (!calendlyUrl) return '';
  const params = new URLSearchParams();
  params.set('utm_source', 'website');
  if (selectedService.value) params.set('utm_content', selectedService.value);
  if (frequency.value) params.set('utm_medium', frequency.value);
  return `${calendlyUrl}?${params.toString()}`;
});

// ── Submit booking details & advance to scheduling ──
async function submitAndSchedule() {
  if (honeypot.value || !canProceedStep2.value) return;
  submitting.value = true;
  submitError.value = '';
  try {
    await fetch(`${apiBase}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim(),
        email: contactForm.email.trim(),
        phone: contactForm.phone.trim(),
        service: selectedService.value,
        squareFootage: sqft.value,
        bedrooms: bedrooms.value,
        bathrooms: bathrooms.value,
        floors: floors.value,
        frequency: frequency.value,
        addOns: selectedAddOns.value,
        notes: contactForm.notes.trim()
      })
    });
  } catch {
    // Non-fatal — always proceed to scheduling even if email fails
  } finally {
    submitting.value = false;
    step.value = 3;
  }
}
</script>

<style scoped>
.booking-page { background: #f9fafb; min-height: 100vh; }

.booking-hero {
  padding: 4rem 1.5rem 3rem;
  background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
  text-align: center;
}
.booking-hero h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; color: #1f2937; }
.booking-hero p { margin-top: 1rem; font-size: 1.125rem; color: #6b7280; max-width: 600px; margin-inline: auto; }

.booking-content { padding: 3rem 1.5rem 6rem; }
.booking-wrap { max-width: 896px; margin: 0 auto; }
.booking-card {
  background: #fff; border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; overflow: hidden;
}

/* Progress Bar */
.progress-bar { background: #f9fafb; display: flex; }
.progress-step {
  flex: 1; text-align: center; padding: 1rem 0.5rem; font-size: 0.8rem;
  font-weight: 700; border-bottom: 4px solid #e5e7eb; color: #9ca3af; transition: all .3s;
}
.progress-step.active { border-bottom-color: #f472b6; color: #ec4899; }
.progress-step.done { border-bottom-color: #86efac; color: #16a34a; }

/* Body */
.booking-body { padding: 2.5rem 3rem; }
.booking-body h3 {
  font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6; padding-bottom: 0.75rem;
}
.sub-heading {
  font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
  color: #9ca3af; margin: 1.75rem 0 1rem; padding-top: 1.5rem; border-top: 1px solid #f3f4f6;
}
.booking-footer {
  display: flex; justify-content: space-between; align-items: center; margin-top: 2.5rem;
}
.optional-label { font-size: 0.75rem; font-weight: 400; color: #9ca3af; text-transform: none; letter-spacing: 0; }
.submit-error { color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; }

/* Service Radio Cards */
.service-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.5rem;
}
.service-card-radio {
  display: flex; flex-direction: column; gap: 4px; padding: 1rem 1.25rem;
  border: 2px solid #f3f4f6; border-radius: 1rem; cursor: pointer;
  transition: all .2s; position: relative;
}
.service-card-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.service-card-radio:hover { border-color: #fbcfe8; background: #fdf2f8; }
.service-card-radio.selected { border-color: #f472b6; background: #fdf2f8; }
.service-card-radio.selected::after {
  content: '✓'; position: absolute; top: 0.6rem; right: 0.75rem;
  width: 20px; height: 20px; background: #f472b6; color: #fff;
  border-radius: 9999px; font-size: 0.7rem; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
}
.svc-name { font-size: 0.95rem; font-weight: 700; color: #1f2937; }

/* Steppers */
.stepper-group {
  display: flex; align-items: center; gap: 0; border: 1px solid #e5e7eb;
  border-radius: 0.75rem; overflow: hidden; width: fit-content; background: #fff;
}
.stepper-btn {
  width: 40px; height: 44px; border: none; background: #f9fafb; color: #374151;
  font-size: 1.25rem; font-weight: 700; cursor: pointer; transition: background .15s;
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.stepper-btn:hover { background: #fce7f3; color: #ec4899; }
.stepper-btn:active { background: #fbcfe8; }
.stepper-input {
  width: 56px; height: 44px; border: none; border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb; text-align: center; font-size: 1rem;
  font-weight: 700; color: #1f2937; background: #fff; outline: none;
  -moz-appearance: textfield;
}
.stepper-input::-webkit-outer-spin-button,
.stepper-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.stepper-input.wide { width: 90px; }
.stepper-unit {
  padding: 0 0.75rem; font-size: 0.875rem; font-weight: 600; color: #6b7280;
  background: #f9fafb; height: 44px; display: flex; align-items: center;
  border-left: 1px solid #e5e7eb;
}

/* 3-col stepper row */
.stepper-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }
.stepper-row .form-group { margin-top: 0; }

/* Summary chips */
.schedule-desc { color: #6b7280; margin-bottom: 1.5rem; }
.selection-summary { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.summary-chip {
  background: #fce7f3; color: #ec4899; padding: 4px 14px;
  border-radius: 9999px; font-size: 0.8rem; font-weight: 600;
}
.addon-chip { background: #f3f4f6; color: #4b5563; }

/* Calendly */
.calendly-frame { width: 100%; min-height: 700px; border: none; border-radius: 0.75rem; }
.calendly-placeholder {
  padding: 3rem; text-align: center; background: #f9fafb; border-radius: 0.75rem;
  border: 2px dashed #e5e7eb; color: #6b7280;
}
.calendly-placeholder code { background: #fce7f3; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; }

@media (max-width: 768px) {
  .booking-body { padding: 1.5rem; }
  .service-grid { grid-template-columns: 1fr; }
  .stepper-row { grid-template-columns: 1fr 1fr; }
  .calendly-frame { min-height: 600px; }
}
</style>
