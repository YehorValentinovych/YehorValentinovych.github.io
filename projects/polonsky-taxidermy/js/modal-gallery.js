const modal = document.getElementById('modal');
const modalImg = modal.querySelector('.modal-img');
const overlay = modal.querySelector('.modal-overlay');
const closeBtn = modal.querySelector('.modal-close');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');

const galleryItems = document.querySelectorAll('.gallery-item');

const galleryImages = Array.from(galleryItems).map(item => {
  return item.dataset.bg || item.style.backgroundImage.slice(5, -2);
});

let currentIndex = 0;

// открыть
function openModal(index) {
  currentIndex = index;
  modalImg.src = galleryImages[currentIndex];
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// закрыть
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// навигация
function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex];
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex];
}

// события
overlay.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// клавиатура
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

// колесо
modal.addEventListener('wheel', e => {
  e.preventDefault();
  if (e.deltaY > 0) showNext();
  else showPrev();
});

// свайпы
let startX = 0;

modal.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) showNext();
  if (endX > startX + 50) showPrev();
});

// клики по карточкам
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openModal(index));
});
