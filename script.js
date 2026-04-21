function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');

    if (inputVal.length > 0) {
        inputPage.style.display = "none";
        resultPage.style.display = "block";
        displayID.innerText = "ID: " + inputVal;
        
        // --- 修正後的路徑設定 ---
        const bucketName = "memory-log-de585.firebasestorage.app"; 
        // 注意：路徑前綴 RECORDS/ 必須轉換為 RECORDS%2F
        const filePath = "RECORDS%2F" + inputVal + ".wav";
        
        // 使用正確的 Firebase Storage 公開網址格式
        const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filePath}?alt=media`;
        
        player.src = firebaseUrl;
        player.load();
        
        player.onerror = function() {
            console.error("Searching Your Memory...");
            // 友善提示：可以在畫面顯示「記憶密封中，請稍候再試」
        };
    } else {
        alert("Please enter a valid ID!");
    }
}