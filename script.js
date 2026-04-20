function checkID() {
    const inputVal = document.getElementById('id-input').value;
    const inputSection = document.getElementById('input-section');
    const resultSection = document.getElementById('result-section');
    const displayID = document.getElementById('display-id');

    if (inputVal.length > 0) {
        // 隱藏輸入框，顯示結果
        inputSection.style.display = "none";
        resultSection.style.display = "block";
        displayID.innerText = "Fragment ID: " + inputVal;
        
        // 這裡你可以加上一段音效或動畫，增加驚喜感
        console.log("Searching ID: " + inputVal);
    } else {
        alert("Please enter a valid ID!");
    }
}