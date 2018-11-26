var bg = chrome.extension.getBackgroundPage();

document.addEventListener("DOMContentLoaded", function(){
    var divs = document.getElementById("startSendMsg");
    divs.addEventListener("click",bg.startSendMsg);
});