// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Lang Toggle
const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
  langToggle.textContent = langToggle.textContent === 'EN' ? 'UA' : 'EN';
});
