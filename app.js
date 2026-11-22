/* Client-side enquiry validation.
   Nothing is transmitted, persisted or logged: the form is checked locally
   and a successful result only confirms the fields passed their checks. */
(function () {
  'use strict';

  const form = document.getElementById('register-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const typeInput = document.getElementById('home-type');
  const consentInput = document.getElementById('consent');

  const PERMITTED_TYPES = ['Apartment', 'Townhouse', 'Detached home'];
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checks = [
    {
      input: nameInput,
      error: document.getElementById('full-name-error'),
      message: 'Enter your full name.',
      isValid: function () {
        return nameInput.value.trim().length > 0;
      }
    },
    {
      input: emailInput,
      error: document.getElementById('email-error'),
      message: 'Enter a valid email address.',
      isValid: function () {
        return EMAIL_PATTERN.test(emailInput.value.trim());
      }
    },
    {
      input: typeInput,
      error: document.getElementById('home-type-error'),
      message: 'Choose a home type.',
      isValid: function () {
        return PERMITTED_TYPES.indexOf(typeInput.value) !== -1;
      }
    },
    {
      input: consentInput,
      error: document.getElementById('consent-error'),
      message: 'Please confirm that you agree to be contacted.',
      isValid: function () {
        return consentInput.checked;
      }
    }
  ];

  function showError(check) {
    check.input.setAttribute('aria-invalid', 'true');
    check.error.textContent = check.message;
  }

  function clearError(check) {
    check.input.removeAttribute('aria-invalid');
    check.error.textContent = '';
  }

  form.addEventListener('submit', function (event) {
    // Always suppress navigation and submission, valid or not.
    event.preventDefault();
    status.textContent = '';

    let firstInvalid = null;

    checks.forEach(function (check) {
      if (check.isValid()) {
        clearError(check);
      } else {
        showError(check);
        if (!firstInvalid) firstInvalid = check.input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    status.textContent = 'Validation complete. Your enquiry has not been sent.';
  });

  // Clear an error as soon as its field is corrected.
  checks.forEach(function (check) {
    const eventName = check.input === typeInput || check.input === consentInput
      ? 'change'
      : 'input';

    check.input.addEventListener(eventName, function () {
      if (check.isValid()) clearError(check);
    });
  });
})();
