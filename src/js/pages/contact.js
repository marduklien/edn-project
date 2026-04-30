import '../main.js';

const form = document.querySelector('[data-contact-form]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('表單送出練習：目前尚未串接後端。');
});
