import Dexie from 'dexie'
interface Program {
  key?: number;
  projectName?: string;
  projectAddress?: string;
  gitDepot?: string;
}

class ProgramDatabase extends Dexie {
  public Programs: Dexie.Table<Program, number>; // id is number in this case
  public constructor() {
    super('ProgramDatabase')
    this.version(1).stores({
      Programs: '++key,projectName,projectAddress,gitDepot'
    })
    this.Programs = this.table('Programs')
  }
}

const db = new ProgramDatabase()

const AddItem = (projectName: string, projectAddress: string, gitDepot: string) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Programs, async () => {
      if ((await db.Programs.where({ projectName }).count()) === 0) {
        const id = await db.Programs.add({ projectName, projectAddress, gitDepot })
        resolve(`添加成功，文章ID为 ${id}`)
      }
    }).catch(e => {
      reject(e.stack || e)
    })
  })
}

const DeleteItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Programs, async () => {
      await db.Programs.delete(key).then(_ => {
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
    db.transaction('rw', db.Programs, async () => {
      await db.Programs.toArray().then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

const UpdateItem = (key: number, changes: Program) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Programs, async () => {
      await db.Programs.update(key, changes).then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

export { UpdateItem, GetItem, DeleteItem, AddItem }
