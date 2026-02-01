/* ============================================
   NOIR LUMIÈRE - JavaScript
   スクロールアニメーション・インタラクション
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションのスクロール効果
    initNavigation();
    
    // スクロールアニメーション
    initScrollAnimations();
    
    // スムーズスクロール
    initSmoothScroll();
    
    // フォーム送信
    initContactForm();
});

/**
 * ナビゲーションの初期化
 * - スクロール時の背景変更
 * - モバイルメニューのトグル
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // スクロール時にナビゲーション背景を変更
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // モバイルメニュートグル
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // メニューリンクをクリックしたらメニューを閉じる
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * スクロールアニメーションの初期化
 * Intersection Observerを使用して要素を表示
 */
function initScrollAnimations() {
    // アニメーション対象の要素にクラスを追加
    const animatedElements = document.querySelectorAll(
        '.story-content, .section-header, .collection-item, ' +
        '.craftsmanship-content, .contact-info, .contact-form, ' +
        '.stat'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Intersection Observerの設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 少し遅延を入れてスタガーアニメーション効果
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                
                // 一度表示したら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // コレクションアイテムにスタガー遅延を追加
    document.querySelectorAll('.collection-item').forEach((item, index) => {
        item.dataset.delay = index * 150;
    });
    
    // 統計にスタガー遅延を追加
    document.querySelectorAll('.stat').forEach((stat, index) => {
        stat.dataset.delay = index * 100;
    });
    
    // 監視開始
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * スムーズスクロールの初期化
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * お問い合わせフォームの初期化
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 実際の実装では、ここでAPIにデータを送信
            console.log('Form submitted:', formData);
            
            // 送信完了のフィードバック
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sent!';
            submitBtn.style.background = 'var(--color-gold)';
            submitBtn.style.color = 'var(--color-black)';
            submitBtn.disabled = true;
            
            // フォームをリセット
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

/**
 * パララックス効果（オプション）
 * パフォーマンスを考慮して、必要に応じて有効化
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .story-bg, .craftsmanship-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rate = el.dataset.parallaxRate || 0.3;
            el.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });
}

// パララックスを有効化する場合は以下のコメントを外す
// initParallax();
