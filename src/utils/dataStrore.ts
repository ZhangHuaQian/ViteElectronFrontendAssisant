import Dexie from 'dexie'
interface Technical {
  key?: number;
  articleName?: string;
  articleAddress?: string;
}

class TechnicalDatabase extends Dexie {
  public Technical: Dexie.Table<Technical, number>; // id is number in this case
  public constructor() {
    super('TechnicalDatabase')
    this.version(1).stores({
      technicals: '++key,articleName,articleAddress'
    })
    this.Technical = this.table('technicals')
  }
}

const db = new TechnicalDatabase()

const AddItem = (articleName: string, articleAddress: string) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Technical, async () => {
      if ((await db.Technical.where({ articleName }).count()) === 0) {
        const id = await db.Technical.add({ articleName, articleAddress })
        resolve(`添加成功，文章ID为 ${id}`)
      }
    }).catch(e => {
      reject(e.stack || e)
    })
  })
}

const DeleteItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Technical, async () => {
      await db.Technical.delete(key).then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    }).catch(e => {
      reject(e.stack || e)
    })
  })
}

const GetItem = () => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Technical, async () => {
      await db.Technical.toArray().then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

const UpdateItem = (key: number, changes: Technical) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Technical, async () => {
      await db.Technical.update(key, changes).then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

export { UpdateItem, GetItem, DeleteItem, AddItem }
