const lazyItems = document.querySelectorAll('.gallery-item');

const bgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const item = entry.target;
    const src = item.dataset.bg;

    if (src) {
      item.style.backgroundImage = `url(${src})`;
      item.removeAttribute('data-bg');
    }

    bgObserver.unobserve(item);
  });
}, {
  rootMargin: '200px',
  threshold: 0.1
});

lazyItems.forEach(item => bgObserver.observe(item));


const revealItems = document.querySelectorAll(
  '.reveal, .timeline .item, .story-full .item'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  }
);

revealItems.forEach(el => revealObserver.observe(el));
