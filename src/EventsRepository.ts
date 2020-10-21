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
      date TEXT NOT NULL,
      details TEXT NOT NULL)`
    return this.dao.run(sql)
  }

  public create(date: string, details: string) {
    return this.dao.run(
      'INSERT INTO events (date, details) VALUES (?, ?)',
      [date, details]
    )
  }

  public update(dateID: string, event: string) {
    return this.dao.run(
      'UPDATE events SET  date = ?, event = ? WHERE date = ?',
      [dateID, event]
    )
  }

  public delete(id: number) {
    return this.dao.run(
      'DELETE FROM events WHERE id = ?',
      [id]
    )
  }

}