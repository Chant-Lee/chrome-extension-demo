// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('我是后台收到来自 content-script 的消息：')
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  )
  if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' })
})
