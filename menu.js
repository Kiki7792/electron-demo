// GUI模块 如Menu, dialog等仅在 主进程可用, 渲染进程不可用
// 使用 remote 模块, 你可以调用 main 进程对象的方法
// Menu是主进程的模块, 仅在主进程(main process)中可用
// 而在渲染进程(render process)中 需通过 remote 模块使用Menu

/**
 * 注意事项： 因为安全原因，remote 模块能在以下几种情况下被禁用：
 * BrowserWindow - 通过设置 enableRemoteModule 选项为 false。
 *  <webview> - 通过把  enableremotemodule属性设置成 false。
 */

/**
 * remote 模块
 * 为渲染进程(web页面) 和 主进程通信 (IPC) 提供了一种简单方法
 */

const { Menu, dialog } = require('electron')
const pjson = require('./package.json')

// Mac电脑菜单的第一个label为系统自定义的名称，所以我们的“设置”二字并没有将其替换掉。
let template = [
  {
    label: '设置', // 一级菜单
    submenu: [ // 二级菜单
      { label: '快捷键设置' },
      { label: '系统设置' }
    ]
  },
  {
    label: '关于',
    submenu: [
      {
        label: '关于Electron',
        // 绑定菜单的 click 方法
        click: () => {
          dialog.showMessageBox({
            message: '当前版本: ' + pjson.version
          }).then(res => {
            console.log(res)
          })
        }
      },
      { label: '关于Node' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)