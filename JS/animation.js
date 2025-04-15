document.addEventListener("DOMContentLoaded", function () {
  // -------------------------------
  // Fade-in アニメーションの処理（そのままでOK）
  // -------------------------------
  const faders = document.querySelectorAll('.fade-in');
  const options = { threshold: 0.3 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, options);

  faders.forEach(fader => {
    const rect = fader.getBoundingClientRect();
    const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (fullyVisible) fader.classList.add('visible');
    observer.observe(fader);
  });

  // -------------------------------
  // アンカーリンクのスムーススクロール補正（ウィンドウ幅に応じて）
  // -------------------------------
  const isMobile = window.innerWidth <= 768;
  const headerHeight = isMobile ? 200 : 120;
  const scrollOffset = 0;
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - scrollOffset;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
