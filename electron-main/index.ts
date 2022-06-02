// electron-main/index.ts
import { app, BrowserWindow, protocol, ipcMain } from "electron";
import path from "path";
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { exec, ChildProcess } from 'child_process'
import { autoUpdater } from 'electron-updater'
let workerProcess: ChildProcess
const isDevelopment = process.env.NODE_ENV !== 'production'
let win: any

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
    console.log(workerProcess.pid)
  })
  ipcMain.on('NpmRunning', (e, key, Path) => {
    console.log('running')
    // 修改环境 development -> production
    const env = {
      ...process.env,
      NODE_ENV: 'production'
    }
    workerProcess = exec('npm run ' + key, { cwd: Path, windowsHide: false, shell: 'powershell', maxBuffer: 1024 * 1024 * 1024 * 1024, killSignal: 'SIGTERM', env })
    workerProcess!.stdout!.on('data', (data: string) => {
      console.log(data)
      // consoleData.value.push(data)
      e.sender.send('NpmRunningResult', data)
    })

    workerProcess.on('error', (error: Event) => {
      console.log(error)
    })
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