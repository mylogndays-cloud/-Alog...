function checkID() {
    const inputVal = document.getElementById('id-input').value.trim();
    const inputPage = document.getElementById('input-page');
    const resultPage = document.getElementById('result-page');
    const displayID = document.getElementById('display-id');
    const player = document.getElementById('audio-player');

    if (inputVal.length > 0) {
        inputPage.style.display = "none";
        resultPage.style.display = "block";
        displayID.innerText = "Your Memory ID:" + inputVal;
        
        // 嘗試播放對應 ID 的錄音檔
        player.src = "RECORDS/" + inputVal + ".wav";
        player.load();
    } else {
        alert("Please enter a valid ID!");
    }
}