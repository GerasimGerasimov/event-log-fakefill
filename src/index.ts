console.log('event-log-sqlite started');
import { createRecordsObject } from './createdata';
import TDAO  from './DAO';
import EventsRepositoty from './EventsRepository';


function main(){
  const dao: TDAO = new TDAO('./db/database.sqlite3');
  const eventsRepo = new EventsRepositoty(dao);

  eventsRepo.createTable();
  setTimeout(()=>{
    console.log('start to create records')
    createRecordsObject(15,
      (date, event)=>{
        //console.log(JSON.stringify({date, event}, null, 2));
        eventsRepo.create(date, JSON.stringify(event))
      }
    );
    const data: any = eventsRepo.getByID(1)
    console.log(data)
  }, 1000);
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