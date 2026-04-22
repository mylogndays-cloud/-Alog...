/**
 * & A ... log | 手機優化版 JS
 */

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    if (idFromUrl) {
        document.getElementById('id-input').value = idFromUrl;
        setTimeout(checkID, 300); // 稍微延遲讓轉場更順
    }
};

function activateLetterAnimation() {
    const letter = document.getElementById('letter');
    const flap = document.getElementById('flap');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                letter.classList.add('unfold'); // 觸發 CSS 動畫
                flap.style.transform = 'rotateX(180deg)';
                flap.style.opacity = '0';
            }
        });
    }, { threshold: 0.1 });

    observer.observe(letter);
}

function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');

    if (!inputVal) return;

    // 介面轉場
    inputPage.style.display = "none";
    resultPage.style.display = "flex";
    resultPage.classList.add('fade-in'); // 建議在 CSS 加入 fade-in 動畫
    displayID.innerText = "MEMORY NO. " + inputVal;

    const bucketName = "memory-log-de585.firebasestorage.app";
    const filePath = "RECORDS%2F" + inputVal + ".wav";
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filePath}?alt=media`;

    player.src = firebaseUrl;
    player.load();

    // 手機網路較慢，若讀取失敗則自動重試
    let retryTimer;
    player.onerror = function() {
        displayID.innerText = "Memory is sealing... Please wait.";
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => {
            player.load();
            displayID.innerText = "MEMORY NO. " + inputVal;
        }, 5000); 
    };

    // 成功載入後自動播放
    player.oncanplaythrough = () => {
        player.play().catch(e => console.log("等待點擊播放"));
    };

    activateLetterAnimation();
}

function goBack() {
    location.reload(); // 手機版最簡單的重置方式就是重新載入
}