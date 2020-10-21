import sqlite3 = require('sqlite3')

export default class TDAO {
  private db: sqlite3.Database;
  
  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connect to database')
      }
    })
  }

  public run(sql: string, params:Array<any> = []): {id: any} | any{
    this.db.run(sql, params, (err)=>{
      if (err) {
        console.log('Error runnig sql' + sql);
        console.log(err);
        return (err)
      } else {
        return {id:'some ID'}
      }
    })
  }
}