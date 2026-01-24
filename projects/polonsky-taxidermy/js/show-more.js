const items = document.querySelectorAll('.gallery-item');
const btn = document.querySelector('.show-more');

let visibleCount = 6;
const step = 3;

function showItems(from, to) {
  const slice = Array.from(items).slice(from, to);

  slice.forEach((item, i) => {
    // 1. добавляем в поток
    item.classList.add('pre-visible');

    // 2. даём браузеру кадр
    requestAnimationFrame(() => {
      setTimeout(() => {
        item.classList.add('visible');
      }, i * 120);
    });
  });
}

btn.addEventListener('click', e => {
  e.preventDefault();

  const prevCount = visibleCount;
  visibleCount += step;

  showItems(prevCount, visibleCount);

  if (visibleCount >= items.length) {
    btn.style.display = 'none';
  }
});

// стартовое состояние
showItems(0, visibleCount);
