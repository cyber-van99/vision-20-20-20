var ms = 20000;

async function timeout() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  timeoutExist = true;
  await sleep(ms);

  chrome.tabs.query({ title: "Timeout" }, (tab) => {
    if (tab.length > 0) {
      tabId = parseInt(tab[0].id);
      chrome.tabs.remove(tabId);
      chrome.runtime.sendMessage({ timeout: true });
    }
  });
}

timeout();
