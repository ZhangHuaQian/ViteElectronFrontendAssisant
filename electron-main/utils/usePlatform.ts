import os from 'os'
export default () => {
  const p = os.type()
  const isWindows = p === 'Windows_NT'

  const isMacOs = p === 'Darwin'

  const isLinux = p === 'Linux'

  return { isWindows, isMacOs, isLinux }
}
