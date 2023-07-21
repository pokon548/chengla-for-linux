import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface JSBridgeArgs {
  key: string
  value: string
}

// Custom APIs for renderer
const api = {}

// 实现前端的 JSBridge
const CLClient = {
  /**
   * @description 实现橙啦网页端的 JSBridge
   * @param {string} args 网页段传入的 JSON 参数
   */
  invokeMethod(args: string): void {
    const jsBridgeArgs: JSBridgeArgs = JSON.parse(args)
    switch (jsBridgeArgs.key) {
      case 'url':
        ipcRenderer.send('url', jsBridgeArgs.value)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('CLClient', CLClient)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  CLClient
}

document?.querySelector('.bjy-video')?.addEventListener('click', () => {
  console.log('test flow')
})
