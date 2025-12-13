const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

langToggle.addEventListener('click', () => {
  langToggle.textContent = langToggle.textContent === 'EN' ? 'UA' : 'EN';
});
