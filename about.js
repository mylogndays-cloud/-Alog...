/**
 * about.js
 * 負責 Exhibition Guide 頁面的語言切換與互動邏輯
 */

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    
    // 初始化語言狀態
    let currentLang = 'zh';

    const toggleLang = () => {
        // 選取所有需要切換的元素
        const zhElements = document.querySelectorAll('.lang-zh');
        const enElements = document.querySelectorAll('.lang-en');

        if (currentLang === 'zh') {
            // --- 切換至英文 ---
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => {
                // 如果是 span，通常我們希望它是 inline 或 block（視 CSS 而定）
                // 這裡我們讓它恢復到 CSS 預設的顯示方式，而不是強制 block
                el.style.display = 'block'; 
            });
            langBtn.innerText = '繁 / EN';
            currentLang = 'en';
        } else {
            // --- 切換至中文 ---
            enElements.forEach(el => el.style.display = 'none');
            zhElements.forEach(el => {
                el.style.display = 'block';
            });
            langBtn.innerText = 'EN / 繁';
            currentLang = 'zh';
        }

        // 這裡加上一個保險：針對 footer 裡的返回按鈕
        // 因為返回按鈕內部的 span 需要是 inline 顯示才不會斷行
        const backBtnSpans = document.querySelectorAll('.back-btn span');
        backBtnSpans.forEach(span => {
            if (span.style.display !== 'none') {
                span.style.display = 'inline';
            }
        });
    };

    if (langBtn) {
        langBtn.addEventListener('click', toggleLang);
    }
    
    // --- 額外豐富化：滾動進度條 ---
    // 在 body 最上方加入一個進度條元素 (如果 HTML 沒加，這裡動態產生)
    if (!document.getElementById('progress-bar')) {
        const prog = document.createElement('div');
        prog.id = 'progress-bar';
        prog.style.cssText = "position:fixed; top:0; left:0; height:4px; background:#8b0000; z-index:200; width:0%; transition:width 0.1s;";
        document.body.prepend(prog);
    }

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});