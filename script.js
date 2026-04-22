/**
 * & A ... log | Memory Retrieval Script
 * 功能：根據 ID 從 Firebase Storage 抓取音訊並播放，並觸發信件彈出動畫
 */

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    if (idFromUrl) {
        document.getElementById('id-input').value = idFromUrl;
        checkID();
    }
};

/**
 * 核心動畫邏輯：偵測滾動並彈出信件
 */
function activateLetterAnimation() {
    const letter = document.getElementById('letter');
    const flap = document.getElementById('flap');

    // 建立觀察器：當信封蓋子進入畫面 80% 時觸發
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 這裡要對應 CSS 中的 .unfold
                letter.classList.add('unfold');
                // 蓋子翻開並消失
                flap.style.transform = 'rotateX(180deg)';
                flap.style.opacity = '0';
            }
        });
    }, { threshold: 0.2 });

    observer.observe(flap);
}

function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');

    if (inputVal.length === 0) {
        alert("Please enter a valid ID!");
        return;
    }

    // 1. 切換顯示介面 (統一使用 flex 以利居中)
    inputPage.style.display = "none";
    resultPage.style.display = "flex";
    displayID.innerText = "MEMORY NO. " + inputVal;

    // 2. Firebase 設定
    const bucketName = "memory-log-de585.firebasestorage.app";
    const filePath = "RECORDS%2F" + inputVal + ".wav";
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filePath}?alt=media`;

    // 3. 載入音訊
    player.src = firebaseUrl;
    player.load();

    // 4. 錯誤處理
    player.onerror = function() {
        console.error("Audio not found...");
        displayID.innerText = "Memory is sealing... Please wait a moment.";
        
        setTimeout(() => {
            if (player.src === firebaseUrl) {
                player.load();
                displayID.innerText = "MEMORY NO. " + inputVal;
            }
        }, 5000);
    };

    // 5. 啟動信件彈出偵測
    activateLetterAnimation();
}

function goBack() {
    document.getElementById('input-page').style.display = "block";
    document.getElementById('result-page').style.display = "none";
    document.getElementById('audio-player').pause();
    
    // 重置動畫狀態，以便下次查詢時重新彈出
    const letter = document.getElementById('letter');
    const flap = document.getElementById('flap');
    letter.classList.remove('unfold');
    flap.style.transform = 'rotateX(0deg)';
    flap.style.opacity = '1';
}