

function callbackground(){
    chrome.runtime.sendMessage({ reset: true });
}

setInterval(callbackground,30000);