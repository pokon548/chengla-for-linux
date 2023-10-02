import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'node:path'

import { download } from 'electron-dl'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 1080,
    show: true,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  win.loadURL('https://client.orangevip.com', {
    userAgent: 'CLClient 1.0'
  })

  ipcMain.on('url', async (_event, url) => {
    console.log(
      await download(win, url, {
        onStarted(item) {
          new Notification({
            title: '正在下载课程资料',
            body: item.getFilename()
          }).show()
        },
        onProgress(progress) {
          win.setProgressBar(progress.percent)
        },
        onCompleted(file) {
          new Notification({
            title: '下载完成',
            body: '文件路径：' + file.path.toString()
          }).show()
          win.setProgressBar(1.0)
        }
      })
    )
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
