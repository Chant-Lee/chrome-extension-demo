/**
 * 获取当前选项卡 id
 */
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null)
  })
}

// 接收来自 content-script 或者 background 的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    '收到来自 ' +
      (sender.tab
        ? 'content-script(' + sender.tab.url + ')'
        : 'content 或者 background') +
      ' 的消息：',
    request
  )
  if ((request.name = 'changeColor')) {
    console.log('改变颜色')
  }
})

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (callback) callback(response)
    })
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

/**
 * 插入 js 文件
 * 注意是从根目录寻找文件地址
 */
function insertScriptFile() {
  getCurrentTabId((tabId) => {
    chrome.tabs.executeScript(tabId, { file: 'js/[name].js' })
    chrome.tabs.insertCSS(tabId, { file: 'css/[name]].css' })
  })
}
