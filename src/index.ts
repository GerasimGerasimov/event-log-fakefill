console.log('event-log-sqlite started');
import { createRecordsObject } from './createdata';
import TDAO  from './DAO';
import EventsRepositoty from './EventsRepository';


async function main(){
  const dao: TDAO = new TDAO('./db/database.sqlite3');
  const eventsRepo = new EventsRepositoty(dao);

  await eventsRepo.createTable();
  console.log('start to create records')
  /*
  createRecordsObject(15,
      (date, event)=>{
        await eventsRepo.create(date, JSON.stringify(event))
      }
  )*/
  console.log('get 1:', await eventsRepo.getByID(1))
  console.log('get 2:', await eventsRepo.getByID(2))
  console.log('get 3:', await eventsRepo.getByID(3))
  console.log('get 4:', await eventsRepo.getByID(4))
}

main()


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