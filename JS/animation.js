document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll('.fade-in');
  let userScrolled = false;

  faders.forEach(fader => {
    fader.classList.remove('visible');
  });

  window.addEventListener('scroll', () => {
    userScrolled = true;
  });

  const options = {
    threshold: 0.3  // 20%見えたら反応
  };

  const appearOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.target === faders[0] || userScrolled) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      }
    });
  }, options);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
