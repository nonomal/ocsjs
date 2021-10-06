import { info, log, error } from "console";
import { app, protocol, BrowserWindow,BrowserWindow as BW, shell, ipcMain } from "electron";
import path from "path";
import { SystemSetting } from "../../types";
 
import { BrowserConfig } from "./config";
import { RemoteRouter } from "./router/remote";
import { ScriptsRouter } from "./router/scripts";
import { UpdateRouter } from "./router/update";

 

const Store = require('electron-store');

const store = new Store()
// 判断开发环境
var mode = app.isPackaged ? 'prod' : 'dev'

info("开发环境:" + mode);


export let CurrentWindow: BW | undefined = undefined

app.disableHardwareAcceleration()
app.whenReady().then(async () => {
    // 注册协议
    protocol.registerFileProtocol('app', (req: any, callback: any) => {
        const url = req.url.replace('app://', '')
        const resolve = path.normalize(path.resolve(`./resources/app`, url))
        info({ path: resolve });
        callback({ path: resolve })
    })


    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })


    CurrentWindow = await createWindow()

})






async function createWindow() {
    const win: any = new BrowserWindow(BrowserConfig)
    win.show()

    win.webContents.openDevTools()
    load()
    log('loading!')
    function load() {

        // Load a remote URL  
        const promise = mode === 'dev' ? win.loadURL('http://localhost:3000') : win.loadURL('app://./public/index.html')

        promise.then((result: any) => {

            // 拦截页面跳转
            win.webContents.on('will-navigate', (e: { preventDefault: () => void; }, url: any) => {
                e.preventDefault()
                shell.openExternal(url)
            })
            win.webContents.setWindowOpenHandler((data: { url: any; }) => {
                shell.openExternal(data.url)
                return {
                    action: 'deny'
                }
            })

            UpdateRouter(ipcMain)
            ScriptsRouter(ipcMain)
            RemoteRouter(ipcMain)
            initSetting()
        }).catch((err: any) => {

            setTimeout(() => {
                log('reloading!')
                load()
            }, 2000);
            error(err);
        });
    }


    return win

}


function initSetting() {
    const setting: SystemSetting = store.get('setting')
    if (setting) {
        const { path, win } = setting
        if (path) {
            for (const key in path) {
                app.setPath(key, (path as any)[key])
            }
        }

        if (win) {
            CurrentWindow?.setAlwaysOnTop(win.isAlwaysOnTop)
        }
    }
}



