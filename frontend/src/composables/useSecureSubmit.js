import { ref } from 'vue';
import { generateCsrfToken } from '../utils/security';
import { sanitizeTextInput } from '../utils/sanitizer';

const STORAGE_KEY = 'sl_contact_submissions';
const API_ENDPOINT = import.meta.env?.VITE_CONTACT_API || '';

function getSubmissionCount() {
  try {
    return Number(sessionStorage.getItem(STORAGE_KEY) || 0);
  } catch {
    return 0;
  }
}

function incrementSubmissionCount() {
  try {
    const next = getSubmissionCount() + 1;
    sessionStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 999;
  }
}

export default function useSecureSubmit() {
  const submitting = ref(false);
  const csrfToken = ref(generateCsrfToken());
  const startedAt = ref(Date.now());
  const honeypot = ref('');

  const canSubmit = () => {
    return !honeypot.value;
  };

  const submit = async (payload, validator) => {
    if (!canSubmit()) {
      throw new Error('Form blocked by security rules.');
    }

    const { valid, sanitized } = validator(payload);
    if (!valid) {
      throw new Error('Validation failed.');
    }

    submitting.value = true;
    const submissionRecord = {
      ...sanitized,
      submittedAt: new Date().toISOString(),
      csrf: csrfToken.value
    };

    try {
      if (API_ENDPOINT) {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitized)
        });
        if (!response.ok) {
          throw new Error('Server submission failed.');
        }
      }

      incrementSubmissionCount();
      return {
        message: "Thank you! We'll get back to you shortly.",
        detail: Object.fromEntries(
          Object.entries(submissionRecord).map(([key, value]) => [key, sanitizeTextInput(value)])
        )
      };
    } finally {
      submitting.value = false;
      csrfToken.value = generateCsrfToken();
      startedAt.value = Date.now();
      honeypot.value = '';
    }
  };

  return { submitting, csrfToken, startedAt, honeypot, canSubmit, submit, sanitizeTextInput };
}
