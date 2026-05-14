import '../main.js';
import '../../scss/page-contact.scss';

const form = document.querySelector('[data-contact-form]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Demo form submitted.');
});
