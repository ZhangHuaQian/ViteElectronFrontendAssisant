import Dexie from 'dexie'
interface Issue {
  key?: number;
  issue?: string;
  solution?: string;
}

class IssueDatabase extends Dexie {
  public Issues: Dexie.Table<Issue, number>; // id is number in this case
  public constructor() {
    super('IssueDatabase')
    this.version(1).stores({
      Issues: '++key,issue,solution'
    })
    this.Issues = this.table('Issues')
  }
}

const db = new IssueDatabase()

const AddItem = (issue: string, solution: string) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Issues, async () => {
      const id = await db.Issues.add({ issue, solution })
      resolve(`添加成功，文章ID为 ${id}`)
    }).catch(e => {
      reject(e.stack || e)
    })
  })
}

const DeleteItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Issues, async () => {
      await db.Issues.delete(key).then(_ => {
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
    db.transaction('rw', db.Issues, async () => {
      await db.Issues.toArray().then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}
const GetKeyToItem = (key: number) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Issues, async () => {
      await db.Issues.get(key).then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

const UpdateItem = (key: number, changes: Issue) => {
  return new Promise((resolve, reject) => {
    db.transaction('rw', db.Issues, async () => {
      await db.Issues.update(key, changes).then(_ => {
        resolve(_)
      }).catch(e => {
        reject(e)
      })
    })
  })
}

export { UpdateItem, GetItem, DeleteItem, AddItem, GetKeyToItem }
