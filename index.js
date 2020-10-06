const { app, BrowserWindow } = require('electron')

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800, // 宽
    height: 600, // 高
    webPreferences: { // 启用node可以在渲染进程中使用
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  /**
   * 引入menu.js
   */
  require('./menu')

  // 并且加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()

  // 窗口监听关闭事件, win置为null, 防止占用内存
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  createWindow()
})