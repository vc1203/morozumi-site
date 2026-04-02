/* ==========================================
   1. アニメーション (スクロールフェードイン)
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
  // アニメーション対象（.fade-inクラス）を取得
  const scrollElements = document.querySelectorAll('.fade-in');

  // 画面に入ったかを判定する設定
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 要素が画面に入ったら 'is-visible' クラスを付与
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度表示したら監視を終了
      }
    });
  }, {
    // 画面の下から10%の位置に来たら実行
    rootMargin: '0px 0px -10% 0px'
  });

  // 各要素の監視を開始
  scrollElements.forEach(el => observer.observe(el));
});


/* ==========================================
   2. headerとfooterの読み込み
   ========================================== */
function includeHTML() {
  const header = document.getElementById('header-include');
  const footer = document.getElementById('footer-include');

  // ヘッダーの読み込み
  if (header) {
    fetch('header.html')
      .then(response => response.text())
      .then(data => { 
        header.innerHTML = data;
        // ヘッダー読み込み完了後にツールチップを有効化
        initTooltip(); 
      });
  }

  // フッターの読み込み
  if (footer) {
    fetch('footer.html')
      .then(response => response.text())
      .then(data => { 
        footer.innerHTML = data; 
        // contact.htmlのときだけ表示されない
        if (window.location.pathname.includes('contact.html')) {
          const fixedBtn = document.querySelector('.btn-consult-fixed');
          if (fixedBtn) {
            fixedBtn.style.display = 'none';
          }
        }
      });
  }
}
// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', includeHTML);


/* ==========================================
   3. Bootstrapを動かす処理 (ツールチップ等のUI部品)
   ========================================== */
/**
 * Bootstrapのツールチップを有効化する関数
 * header.htmlの読み込み完了後に呼び出されます
 */
function initTooltip() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}