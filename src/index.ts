console.log('event-log-sqlite started');
import faker = require('faker');
import { createEvent } from './createdata';
import TDAO  from './DAO';
import EventsRepositoty from './EventsRepository';
import { IEvent } from './iDBEvent';

/*TODO заполнить таблицу 4099 значений релевантных данных*/
async function main(){
  const dao: TDAO = new TDAO('./db/database.sqlite3');
  const eventsRepo = new EventsRepositoty(dao);
  try {

    console.log('start to create table')
    await eventsRepo.createTable();

    console.log('start row count:', await eventsRepo.getRowCount())
    
    async function* asyncGenerator(max: number) {
      let i = 0;
      while (i < max) {
        yield i++;
      }
    }

    console.log('start to create records')

    await dao.run('BEGIN TRANSACTION');

    for await (let i of asyncGenerator(4096)) {
      const event: IEvent = createEvent()
        if (event !== undefined) {

          await eventsRepo.create(event)
          console.log(`create record: ${i} ${event.type} ${event.tag}`)
          
        } else {
          console.log(`Error on record ${i}`)
        }
    }

  } catch(e) {
    console.log('Error :', e)
  }
    await dao.run('COMMIT TRANSACTION');
    console.log('end row count:', await eventsRepo.getRowCount())
    console.log('event-log-sqlite stoped');

}

main()
console.log('exit')