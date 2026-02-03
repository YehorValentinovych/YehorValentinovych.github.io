window.addEventListener('load', () => {
  const title = document.querySelector('.hero-title');
  const text = document.querySelector('.hero-text');
  const btn = document.querySelector('.hero-btn');

  title.classList.add('visible');

  setTimeout(() => text.classList.add('visible'), 600);
  setTimeout(() => btn.classList.add('visible'), 1200);
});
