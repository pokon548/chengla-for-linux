import { contextBridge, ipcRenderer } from "electron";

interface JSBridgeArgs {
  key: string;
  value: string;
}

// 实现前端的 JSBridge
const CLClient = {
  /**
   * @description 实现橙啦网页端的 JSBridge
   * @param {string} args 网页段传入的 JSON 参数
   */
  invokeMethod(args: string): void {
    const jsBridgeArgs: JSBridgeArgs = JSON.parse(args);
    switch (jsBridgeArgs.key) {
      case "url":
        ipcRenderer.send("url", jsBridgeArgs.value);
    }
  },
};

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
contextBridge.exposeInMainWorld("CLClient", CLClient);