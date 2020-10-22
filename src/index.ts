console.log('event-log-sqlite started');
import faker = require('faker');
import { EventsMap, IEventDetails } from './EventsSourceToMap';
import { createEvent, createRecordsObject } from './createdata';
import TDAO  from './DAO';
import EventsRepositoty from './EventsRepository';


async function main(){
  const result:Array<any>=[];
  const dao: TDAO = new TDAO('./db/database.sqlite3');
  const eventsRepo = new EventsRepositoty(dao);
  try {

    console.log('start to create table')
    await eventsRepo.createTable();

    console.log('row count:', await eventsRepo.getRowCount())
    
    async function* asyncGenerator(max: number) {
      var i = 0;
      while (i < max) {
        yield i++;
      }
    }

    console.log('start to create records')
    for await (let i of asyncGenerator(10)) {
      const event = createEvent(faker.random.number({
        'min': 0,
        'max': EventsMap.size - 1})
        )
        if (event !== undefined) {
          const {datetime, tag, details} = {... event}
          await eventsRepo.create(datetime, JSON.stringify({tag, details}))
          console.log('create record:' + i)
        } else {
          console.log(i)
        }
    }

    console.log('start to read records')
    result.push('get 1:', await eventsRepo.getByID(1))
    result.push('get 2:', await eventsRepo.getByID(2))
    result.push('get 3:', await eventsRepo.getByID(3))
    result.push('get 4:', await eventsRepo.getByID(4))
  } catch(e) {
    console.log('Error :', e)
  }
    console.log(JSON.stringify(result, null, 4))
    console.log('event-log-sqlite stoped');
}

main()
console.log('exit')

  /*
  createRecordsObject(15,
      (date, event)=>{
        await eventsRepo.create(date, JSON.stringify(event))
      }
  )*/

/*
const express = require("express")
const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(__dirname + '/dist'));

console.log('server started at 4000')
app.listen(4000)
*/