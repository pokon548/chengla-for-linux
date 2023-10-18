import { app, BrowserWindow, ipcMain, Notification } from "electron";
import path from "node:path";
import { join } from "path";

import { download } from "electron-dl";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 1080,
    show: true,
    icon: app.isPackaged ? join(process.resourcesPath, "icon.png") : join('build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      autoplayPolicy: "user-gesture-required",
    },
  });

  console.log(process.resourcesPath)

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // FIXME: Loading non-existed js from server, which breaks video player :(
  win.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    const { url } = details;
    if (url.includes("app.0a2d1d42.js")) {
      callback({
        cancel: false,
        redirectURL:
          "https://www.orangevip.com/playcheckbjy/static/js/app.cf0e2e53.js",
      });
    } else {
      callback({});
    }
  });

  // Allow press F12 to open dev panel if not packed
  if (!app.isPackaged)
    win.webContents.on("before-input-event", (_e, input) => {
      if (input.type === "keyDown" && input.key === "F12") {
        win.webContents.toggleDevTools();

        win.webContents.on("devtools-opened", () => {
          // Can't use mainWindow.webContents.devToolsWebContents.on("before-input-event") - it just doesn't intercept any events.
          if (win.webContents.devToolsWebContents) {
            win.webContents.devToolsWebContents
              .executeJavaScript(
                `
            new Promise((resolve)=> {
              addEventListener("keydown", (event) => {
                if (event.key === "F12") {
                  resolve();
                }
              }, { once: true });
            })
          `
              )
              .then(() => {
                win.webContents.toggleDevTools();
              });
          }
        });
      }
    });

  win.loadURL("https://client.orangevip.com", {
    userAgent: "CLClient 1.0",
  });

  ipcMain.on("url", async (_event, url) => {
    console.log(
      await download(win, url, {
        onStarted(item) {
          new Notification({
            title: "正在下载课程资料",
            body: item.getFilename(),
          }).show();
        },
        onProgress(progress) {
          win.setProgressBar(progress.percent);
        },
        onCompleted(file) {
          new Notification({
            title: "下载完成",
            body: "文件路径：" + file.path.toString(),
          }).show();
          win.setProgressBar(1.0);
        },
      })
    );
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
