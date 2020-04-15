/**
 * 获取当前选项卡 id
 */
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null)
  })
}

// 插件会先加载用户上次选择的颜色，如果存在的话。
document.addEventListener('DOMContentLoaded', () => {
  // 建立长连接
  ConnectLongBtn.addEventListener('click', function () {
    console.log(77777, 'connect')
    connectContentScriptLong()
  })
})
/**
 * 建立长连接
 */
function connectContentScriptLong() {
  console.log(' running connect ')

  getCurrentTabId((tabId) => {
    var port = chrome.tabs.connect(tabId, { name: 'knockknock' })
    port.postMessage({ joke: 'Knock knock' })
    port.onMessage.addListener(function (msg) {
      console.log('接收到的 msg:', msg)
      if (msg.question == "Who's there?") port.postMessage({ answer: 'Madame' })
      else if (msg.question == 'Madame who?')
        port.postMessage({ answer: 'Madame... Bovary' })
    })
  })
}
