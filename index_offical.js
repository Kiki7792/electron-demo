const { app, BrowserWindow } = require('electron')

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()
}

// electron 初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分API 在ready 事件后 触发才能使用
app.whenReady().then(createWindow)

// 当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上, 除非用户用 cmd+Q 确定退出
  // 否则大部分应用及其菜单栏会保持激活
  if (process.platform === 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 macOS 上, 单击dock 图标并且没有其他窗口打开时,
  // 通常在应用程序中 重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})