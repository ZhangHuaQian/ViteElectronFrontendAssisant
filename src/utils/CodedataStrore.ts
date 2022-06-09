import Dexie from 'dexie'
interface Code {
  key?: number
  describe?: string
  solution?: string
}

class CodeDatabase extends Dexie {
  public CodeStore: Dexie.Table<Code, number> // id is number in this case
  public constructor() {
    super('CodeDatabase')
    this.version(1).stores({
      CodeStore: '++key,describe,solution',
    })
    this.CodeStore = this.table('CodeStore')
  }
}

const db = new CodeDatabase()

const AddItem = ({ describe, solution }: Code) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.CodeStore, async () => {
      const id = await db.CodeStore.add({ describe, solution })
      resolve(`添加成功，文章ID为 ${id}`)
    }).catch((e) => {
      reject(e.stack || e)
    })
  })
}

const DeleteItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.CodeStore, async () => {
      await db.CodeStore.delete(key)
        .then((_) => {
          resolve(_)
        })
        .catch((e) => {
          reject(e)
        })
    }).catch((e) => {
      reject(e.stack || e)
    })
  })
}

const GetItem = () => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.CodeStore, async () => {
      await db.CodeStore.toArray()
        .then((_) => {
          resolve(_)
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}
const GetKeyToItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.CodeStore, async () => {
      await db.CodeStore.get(key)
        .then((_) => {
          resolve(_)
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}

const UpdateItem = (key: number, changes: Code) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.CodeStore, async () => {
      await db.CodeStore.update(key, changes)
        .then((_) => {
          resolve(_)
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}

export { UpdateItem, GetItem, DeleteItem, AddItem, GetKeyToItem }
