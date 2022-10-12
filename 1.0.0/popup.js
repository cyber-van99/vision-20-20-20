const pauseBtn = document.getElementById("switchPause");
const resetBtn = document.getElementById("switchReset");
const text = document.getElementById("text");
const timer = document.getElementById("timer");

//Pause Button
pauseBtn.addEventListener("click", pauseResume);

//Pause and Resume Function embedded into one Function
function pauseResume() {
  pauseBtn.innerHTML == "Pause" ? pause() : resume();
}

function pause() {
  chrome.runtime.sendMessage({ pause: true });
  pauseBtn.innerHTML = "Resume";
}
function resume() {
  chrome.runtime.sendMessage({ resume: true });
  pauseBtn.innerHTML = "Pause";
}

//Reset button
resetBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ reset: true });
  pauseBtn.innerHTML = "Pause";
});

// Displays Timer
chrome.storage.onChanged.addListener((changes, areaName) => {
  chrome.storage.local.get("time", function (result) {
    timer.innerHTML = `${result.time.minutes}:${result.time.seconds}`;
  });
});
