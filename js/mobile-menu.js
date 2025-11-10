const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-menu-overlay');
const closeBtn = document.querySelector('.close-menu');

function toggleMenu(open) {
  mobileMenu.classList.toggle('open', open);
  overlay.classList.toggle('active', open);
  hamburger.classList.toggle('active', open);
}

hamburger.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));
overlay.addEventListener('click', () => toggleMenu(false));
