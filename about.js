/**
 * about.js
 * 負責 Exhibition Guide 頁面的語言切換與互動邏輯
 */

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const zhElements = document.querySelectorAll('.lang-zh');
    const enElements = document.querySelectorAll('.lang-en');

    // 初始化：設定當前語言狀態
    let currentLang = 'zh';

    /**
     * 切換語言函數
     */
    const toggleLang = () => {
        if (currentLang === 'zh') {
            // 切換至英文
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => {
                // 如果是 Inline 元素（如 Return to Log），保持 inline 顯示
                if (el.tagName === 'SPAN' || el.classList.contains('inline')) {
                    el.style.display = 'inline';
                } else {
                    el.style.display = 'block';
                }
            });
            langBtn.innerText = '繁 / EN';
            currentLang = 'en';
        } else {
            // 切換至中文
            zhElements.forEach(el => el.style.display = 'block');
            enElements.forEach(el => el.style.display = 'none');
            langBtn.innerText = 'EN / 繁';
            currentLang = 'zh';
        }

        // 可選：切換語言時加入一個微小的漸顯效果
        document.querySelector('.booklet').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.booklet').style.opacity = 1;
            document.querySelector('.booklet').style.transition = 'opacity 0.4s ease';
        }, 50);
    };

    // 綁定點擊事件
    if (langBtn) {
        langBtn.addEventListener('click', toggleLang);
    }
});