document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll('.fade-in');
    const options = {
      threshold: 0.2
    };
  
    const appearOnScroll = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); 
        }
      });
    }, options);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  });
  