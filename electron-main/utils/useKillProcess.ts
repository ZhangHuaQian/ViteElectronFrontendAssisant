import usePlatform from './usePlatform'
import * as cp from 'child_process'
export default (pid, serverProcess) => {
  const { isWindows } = usePlatform()
  console.log(isWindows)
  if (isWindows) {
    return new Promise<void>((c, e) => {
      const killer = cp.exec(`taskkill /pid ${pid} -t -f`, {
        shell: 'powershell',
        encoding: 'utf8',
      })
      killer.stdout?.on('data', (data) => {
        console.log('killer-stdout-data:', data)
      })
      killer.stderr?.on('data', (data) => {
        console.log('kuller-stderr-data:', data)
      })
      killer.on('exit', c)
      killer.on('error', e)
    })
  } else {
    serverProcess.kill('SIGTERM')
    return Promise.resolve(undefined)
  }
}
