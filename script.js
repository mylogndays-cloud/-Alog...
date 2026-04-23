/**
 * & A ... log | 手機優化版 JS (整合日期、蠟印與逐行顯現)
 */

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    // 如果網址帶有 ?id=xxx，自動填入並執行
    if (idFromUrl) {
        const idInput = document.getElementById('id-input');
        if (idInput) {
            idInput.value = idFromUrl;
            setTimeout(checkID, 300); 
        }
    }
};

/**
 * 核心：啟動滾動偵測動畫
 */
function initLetterObservers() {
    // 1. 監聽信封打開 (控制蓋子與長信展開)
    const envelopeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('unfold');
                envelopeObserver.unobserve(entry.target); // 只觸發一次
            }
        });
    }, { 
        threshold: 0.15, // 當信封出現 15% 時觸發
        rootMargin: '0px 0px -50px 0px' 
    });

    const envelopeContainer = document.getElementById('envelope-container');
    if (envelopeContainer) envelopeObserver.observe(envelopeContainer);

    // 2. 監聽文字段落 (逐行漸顯)
    const paragraphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                paragraphObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px' // 讓文字在視窗中間偏下時才顯現
    });

    const paragraphs = document.querySelectorAll('.letter-content p');
    paragraphs.forEach(p => paragraphObserver.observe(p));
}

/**
 * 執行 ID 檢查與介面切換
 */
function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');
    const currentDateSpan = document.getElementById('current-date');

    if (!inputVal) {
        alert("Please enter an ID");
        return;
    }

    // 1. 介面轉場
    inputPage.style.display = "none";
    resultPage.style.display = "flex";
    displayID.innerText = "MEMORY NO. " + inputVal;

    // 2. 設置今日日期 - 只保留 MM / DD
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${month} / ${day}`;
    
    if (currentDateSpan) {
        currentDateSpan.innerText = dateStr;
        console.log("Date updated to:", dateStr); // 確認是否有執行
    }

    // 3. Firebase 音訊載入
    const bucketName = "memory-log-de585.firebasestorage.app";
    const filePath = "RECORDS%2F" + inputVal + ".wav";
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filePath}?alt=media`;

    player.src = firebaseUrl;
    player.load();

    // 4. 音訊載入處理
    let retryTimer;
    player.onerror = function() {
        displayID.innerText = "Memory is sealing... Please wait.";
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => {
            player.load();
            displayID.innerText = "MEMORY NO. " + inputVal;
        }, 5000); 
    };

    player.oncanplaythrough = () => {
        player.play().catch(e => console.log("等待點擊播放"));
    };

    // 5. 初始化動畫
    initLetterObservers();
}
function goBack() {
    location.reload(); 
}