console.log('content-script')

chrome.runtime.sendMessage({ greeting: 'hello' }, function (response) {
  console.log('收到来自后台的回复：' + response.farewell)
})

chrome.runtime.onConnect.addListener(function (port) {
  console.log('这里是 content script')
  console.log('port name', port.name)
  port.onMessage.addListener(function (msg) {
    console.log('port msg: ', msg)
    if (msg.joke == 'Knock knock')
      port.postMessage({ question: "Who's there?" })
    else if (msg.answer == 'Madame')
      port.postMessage({ question: 'Madame who?' })
    else if (msg.answer == 'Madame... Bovary')
      port.postMessage({ question: "I don't get it." })
  })
})
