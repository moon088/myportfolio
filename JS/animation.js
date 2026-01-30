document.addEventListener("DOMContentLoaded", function () {
  // 1. フェードイン・アニメーションの制御
  const faders = document.querySelectorAll('.fade-in');

  const observerOptions = {
    // threshold: 0.1 は「要素の10%が画面に入ったら」発火させる設定
    threshold: 0.1,
    // rootMargin は判定位置の微調整。下端から-50pxの位置で判定（少し余裕を持たせる）
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // 再び画面外に出た時に消したい場合は残す。
        // もし「一度出たら出しっぱなし」にしたい場合は、下の1行を消して observer.unobserve(entry.target) を追加
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  faders.forEach(fader => {
    observer.observe(fader);
  });

  // 2. アンカーリンクのスムーススクロール
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (targetId.length > 1 && target) {
        e.preventDefault();

        // クリックされた時点でのヘッダーの高さを取得（レスポンシブ対応）
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // ターゲットの位置を計算
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        // ヘッダー分＋少しの余裕（20px）を引いてスクロール
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});