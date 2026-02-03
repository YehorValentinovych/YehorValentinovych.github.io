let currentScroll = window.scrollY;
let targetScroll = window.scrollY;

window.addEventListener('wheel', e => {
  targetScroll += e.deltaY;
  targetScroll = Math.max(
    0,
    Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
  );
}, { passive: true });

function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.08;
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

smoothScroll();
