export default (key: string) => {
  const get = () => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : ''
  }
  const set = (data: {}) => {
    localStorage.setItem(key, JSON.stringify(data))
  }
  const del = () => {
    localStorage.removeItem(key)
  }
  const update = (value: {}) => {
    set(value)
  }

  return { set, del, update, get }
}
