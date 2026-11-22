// Local-only validation: nothing is sent, stored or logged.
const form = document.getElementById('register-form');
const status = document.getElementById('form-status');

const name = document.getElementById('full-name');
const email = document.getElementById('email');
const homeType = document.getElementById('home-type');
const consent = document.getElementById('consent');

const allowedTypes = ['Apartment', 'Townhouse', 'Detached home'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = [
  {
    input: name,
    error: document.getElementById('full-name-error'),
    message: 'Enter your full name.',
    valid: () => name.value.trim() !== ''
  },
  {
    input: email,
    error: document.getElementById('email-error'),
    message: 'Enter a valid email address.',
    valid: () => emailPattern.test(email.value.trim())
  },
  {
    input: homeType,
    error: document.getElementById('home-type-error'),
    message: 'Choose a home type.',
    valid: () => allowedTypes.includes(homeType.value)
  },
  {
    input: consent,
    error: document.getElementById('consent-error'),
    message: 'Please confirm that you agree to be contacted.',
    valid: () => consent.checked
  }
];

function setError(field, message) {
  field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
  field.error.textContent = message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';

  let firstInvalid = null;

  fields.forEach((field) => {
    if (field.valid()) {
      setError(field, '');
    } else {
      setError(field, field.message);
      firstInvalid = firstInvalid || field.input;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  status.textContent = 'Validation complete. Your enquiry has not been sent.';
});

fields.forEach((field) => {
  const eventName = field.input === homeType || field.input === consent ? 'change' : 'input';
  field.input.addEventListener(eventName, () => {
    if (field.valid()) setError(field, '');
  });
});
