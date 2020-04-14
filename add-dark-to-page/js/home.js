/**
 * 获取URL
 */
function getCurrentTabUrl(callback) {
  let queryInfo = {
    active: true,
    currentWindow: true,
  }

  chrome.tabs.query(queryInfo, (tabs) => {
    let tab = tabs[0]
    let url = tab.url
    console.assert(typeof url === 'string', 'tab.url should be a string')
    callback(url)
  })
}

/**
 *改变当前页面的背景颜色。
 *
 */
function changeBackgroundStyle() {
  const script = 'document.body.style.filter = "grayscale(1)";'
  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // 向页面注入JavaScript代码.
  chrome.tabs.executeScript({
    code: script,
  })
}
// 插件会先加载用户上次选择的颜色，如果存在的话。
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    // 更改 背景颜色
    ChangeBg.addEventListener('click', function () {
      changeBackgroundStyle()
    })
  })
})
