/**
 * & A ... log | Memory Retrieval Script
 * 功能：根據 ID 從 Firebase Storage 抓取音訊並播放
 */

// 當網頁載入時，自動檢查網址是否有 ?id=xxxx
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    if (idFromUrl) {
        // 如果網址有帶 ID，自動填入輸入框並執行查詢
        document.getElementById('id-input').value = idFromUrl;
        checkID();
    }
};

function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');

    // 基礎防呆：確保有輸入 ID
    if (inputVal.length === 0) {
        alert("Please enter a valid ID!");
        return;
    }

    // 1. 切換顯示介面
    inputPage.style.display = "none";
    resultPage.style.display = "block";
    displayID.innerText = "Your Memory ID: " + inputVal;

    // 2. 設定 Firebase Storage 資訊
    // 請確認你的 Bucket Name 是否與 Firebase Console 一致
    // script.js 中的設定
    const bucketName = "memory-log-de585.appspot.com";
    
    // 將路徑 RECORDS/ID.wav 進行 URL 編碼 (斜線轉為 %2F)
    const filePath = "RECORDS%2F" + inputVal + ".wav";
    
    // 3. 組合 Firebase 公開存取網址 (使用 alt=media 格式)
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/memory-log-de585.appspot.com/o/RECORDS%2F${inputVal}.wav?alt=media`;

    // 4. 將網址放入播放器並載入
    player.src = firebaseUrl;
    player.load();

    // 5. 錯誤處理：如果檔案還沒上傳好或 ID 錯誤
    player.onerror = function() {
        console.error("Audio not found or still uploading...");
        
        // 更新文字提示使用者
        displayID.innerText = "Memory is sealing... Please wait a moment.";
        
        // 5秒後嘗試自動重新載入（應對上傳延遲）
        setTimeout(() => {
            if (player.src === firebaseUrl) {
                console.log("Retrying to load memory...");
                player.load();
                displayID.innerText = "Your Memory ID: " + inputVal;
            }
        }, 5000);
    };
}

/**
 * 返回輸入頁面的功能 (如果使用者想查另一個 ID)
 */
function goBack() {
    document.getElementById('input-page').style.display = "block";
    document.getElementById('result-page').style.display = "none";
    document.getElementById('audio-player').pause();
}