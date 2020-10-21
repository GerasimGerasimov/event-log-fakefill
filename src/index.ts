console.log('event-log-sqlite started');
import TDAO  from './DAO';
import EventsRepositoty from './EventsRepository';


function main(){
  const dao: TDAO = new TDAO('./db/database.sqlite3');
  const eventsRepo = new EventsRepositoty(dao);

  eventsRepo.createTable();
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