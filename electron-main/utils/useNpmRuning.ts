import { spawn, ChildProcess } from 'child_process'
import { IpcMainEvent } from 'electron'
export default (e: IpcMainEvent, key: string, Path: string, Name: string) => {
  let workerProcess: ChildProcess
  const KEY = `${Name}-${key}`
  // 修改环境 development -> production
  const env = {
    ...process.env,
    NODE_ENV: 'production',
  }
  workerProcess = spawn('npm run ' + key, {
    cwd: Path,
    windowsHide: false,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: 'powershell',
    env,
  })
  console.log(workerProcess.pid)
  const PID = workerProcess.pid
  workerProcess?.stdout?.on('data', (data: string) => {
    console.log('workerProcess-staout-data:%s', data.toString())
    e.sender.send('NpmRunningResult', { PID, KEY, DATA: data.toString(), KEYName: key })
  })
  workerProcess.stderr?.on('data', (data) => {
    console.log('workerProcess-stderr-data:%s', data.toString())
  })
  workerProcess.on('error', (error: Event) => {
    console.log('workerProcess-err:%s', error)
  })
  workerProcess.on('exit', (code, signal) => {
    console.log('exit')
  })

  return { PID, workerProcess }
}
