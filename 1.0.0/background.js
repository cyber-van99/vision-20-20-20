var tabId;
var handle; 
var timeoutExist = false;
var timeoutHandle;
var currentMinute;
var currentSecond;

//Timer Start Function
var startTimer = function startTimer(duration) {
  var timer = duration,
  minutes,
  seconds;
  handle = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    chrome.storage.local.set({ time: { minutes: minutes, seconds: seconds } });
    
    if (--timer < 0) {
      clearInterval(handle);
      chrome.tabs.create({ active: true, url: "timeout.html" });
    }
    //Get Current Time
    chrome.storage.local.get("time", function (data) {
      currentMinute = data.time.minutes;
      currentSecond = data.time.seconds;
    });
  }, 1000);
}

//Initialization
startTimer(20 * 60);


//Event Handlers (Pause,Resume,Reset)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.pause === true) {
    clearInterval(handle);
  }
  if (request.resume === true) {
    clearInterval(handle);
    startTimer(currentMinute * 60 + currentSecond);
  }
  if (request.reset === true) {
    clearInterval(handle);
    clearTimeout(timeoutHandle);

    if (timeoutExist === true) {
      chrome.tabs.query({ title: "Timeout" }).then((resolve) => {
        tabId = parseInt(resolve[0].id);
        chrome.tabs.remove(tabId);
      });
    }
    startTimer(20*60);
  }
  if (request.timeout === true) {
    clearInterval(handle);
    startTimer(20 * 60);
  }
});

