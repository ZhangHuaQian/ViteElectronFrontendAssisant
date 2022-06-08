// electron-main/index.ts
import { app, BrowserWindow, protocol, ipcMain, Menu, MenuItemConstructorOptions, dialog } from "electron";
import path from "path";
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { exec, spawn, ChildProcess } from 'child_process'
import { autoUpdater } from 'electron-updater'
import useOpenDialog from './utils/useOpenDialog'
import useSaveDialog from "./utils/useSaveDialog";
const controller = new AbortController();
const { signal } = controller;
let workerProcess: ChildProcess
const isDevelopment = process.env.NODE_ENV !== 'production'
let win: any

//自定义菜单
const template = [{
  label: '开发者选项',
  submenu: [
    { label: '控制台', role: 'toggleDevTools' },
    { label: '强制刷新', role: 'forceReload' },
    { label: '刷新', role: 'reload' },
    { label: '全屏', role: 'togglefullscreen' }
  ]
}] as MenuItemConstructorOptions[];
//从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template);
//设置为应用程序菜单
Menu.setApplicationMenu(myMenu)
//右键菜单
const rightTemplate = [
  { label: '复制', accelerator: 'ctrl + c', role: 'copy' },
  { label: '粘贴', accelerator: 'ctrl + v', role: 'paste' },
  { label: '刷新', accelerator: 'ctrl + f', role: 'reload' }] as MenuItemConstructorOptions[];
const rightMenu = Menu.buildFromTemplate(rightTemplate)

function sendStatusToWindow(text: string) {
  win.webContents.send('message', text);
}
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const createWindow = () => {
  win = new BrowserWindow({
    width: 1080,
    height: 800,
    frame: true,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, "../electron-preload/index.js"), // 需要引用js文件
    },
  });


  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:3000"; // 本地启动的vue项目路径
    win.loadURL(url);
  }
};
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

app.whenReady().then(async () => {
  // createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  if (isDevelopment) {
    console.log(VUEJS3_DEVTOOLS.id)
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', (e as any).toString())
    }
  }
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
  ipcMain.on('close', e =>
    win.hide()
  )

  ipcMain.on('minimize', e =>
    win.minimize()
  )
  ipcMain.on('insertData', (e, args) => {
    console.log(args)
  })
  ipcMain.on('NpmKill', () => {

    console.log(workerProcess.pid);
    workerProcess.kill('SIGINT');
    console.log(workerProcess.killed)
  })
  ipcMain.on('NpmRunning', (e, key, Path) => {
    // 修改环境 development -> production
    const env = {
      ...process.env,
      NODE_ENV: 'production'
    }
    //, maxBuffer: 1024 * 1024 * 1024 * 1024  ,detached: true
    workerProcess = spawn('npm run ' + key, { cwd: Path, windowsHide: false, stdio: ['ignore', 'pipe', 'pipe'], shell: 'powershell', env })
    workerProcess?.stdout?.on('data', (data: string) => {
      console.log(data.toString())
      // consoleData.value.push(data)
      e.sender.send('NpmRunningResult', data.toString())
    })
    workerProcess.stderr?.on('data', data => {
      console.log('errordata', data.toString())
    })
    workerProcess.on('error', (error: Event) => {
      console.log(error)
    })
    workerProcess.on('exit', (code, signal) => {
      console.log(code, signal, 'exit')
    })
  }),
    ipcMain.on('contextmenu', (e) => {
      rightMenu.popup()
    }),
    ipcMain.on('openFile', async (e, arg) => {
      const usedialog = await useOpenDialog(dialog, arg);
      await e.sender.send('openFileCallBack', usedialog);

    }),
    ipcMain.on('savaFile', async (e, arg) => {
      const usedialog = await useSaveDialog(dialog, arg);
      await e.sender.send('savaFileCallBack', usedialog);

    })
});


// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}