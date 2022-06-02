import Wangeditor from 'wangeditor'
export default class {
  editor: Wangeditor
  constructor(el: string, callback: (params: string) => void, config: { [key: string]: string | number | boolean }) {
    this.editor = new Wangeditor(el)
    Object.assign(this.editor.config, config)
    this.editor.config.onchange = callback
    this.editor.create()
  }

  public clearEditor() {
    this.editor.txt.clear()
  }

  public InitEditor(value: string) {
    this.editor.txt.append(value)
  }
}
