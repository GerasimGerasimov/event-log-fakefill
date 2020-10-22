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

  public get(sql: string, params: Array<any> = []): any {
    this.db.get(sql, params, (err, result)=>{
      if (err) {
        console.log('Error running sql: ' + sql)
        console.log(err);
      } else {
        console.log(result)
        return result;
      }
    })
  }

  public all(sql: string, params: Array<any> = []): any {
    this.db.all(sql, params, (err, rows)=>{
      if (err) {
        console.log('Error running sql: '+ sql);
        console.log(err);
      } else {
        return rows;
      }
    })
  }
}