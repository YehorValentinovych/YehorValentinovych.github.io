const lazyItems = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const src = item.dataset.bg;

        if (src) {
          item.style.backgroundImage = `url(${src})`;
          item.removeAttribute('data-bg');
        }

        observer.unobserve(item);
      }
    });
  },
  {
    rootMargin: '200px',
    threshold: 0.1
  }
);

lazyItems.forEach(item => observer.observe(item));