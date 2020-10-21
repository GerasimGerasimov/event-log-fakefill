import TDAO from "./DAO";

export default class EventsRepositoty {
  private dao: TDAO;
  
  constructor( dao: TDAO) {
    this.dao = dao;
  }

  public createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`
    return this.dao.run(sql)
  }

  public create(name: string) {
    return this.dao.run(
      'INSERT INTO events (name) VALUES (?)',
      [name]
    )
  }

  public update(events : {id: number, name: string}) {
    const { id, name } = events;
    return this.dao.run(
      'UPDATE events SET name = ? WHERE is = ?',
      [name, id]
    )
  }

  public delete(id: number) {
    return this.dao.run(
      'DELETE FROM events WHERE id = ?',
      [id]
    )
  }

}