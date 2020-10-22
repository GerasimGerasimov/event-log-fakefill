import faker = require('faker');
import { EventsMap, IEventDetails } from './EventsSourceToMap';

function readEventsMap(index: number): {key: string, item: IEventDetails} | undefined{
    let i: number = 0;
    for (const [key, item] of EventsMap.entries()) {
        if ( i++ === index ) return ({key, item});
      }
    return undefined;
}

interface IEvent {
    datetime: string;
    tag: string;
    details: IEventDetails;
}

export function createEvent(index: number): IEvent | undefined{
    //случайное время (нужен формат "2020-09-26T16:18:36.036Z")
    const datetime: any = faker.date.recent(30).toISOString();
    //читаю случайное событие
    const mapData: {key: string, item: IEventDetails} | undefined = readEventsMap(index);
    if (mapData === undefined) return undefined;
    const {key, item} = {... mapData}
    const event: IEvent = {
        datetime,
        tag: key,
        details: item
    }
    return event;
}

interface ICallback {
   (datetime: string, event: {tag: string, details: IEventDetails}): void;
}

export function createRecordsObject(maxrecords: number, callback?:ICallback): void{
    const max: number = EventsMap.size - 1;
    const events: any = {};
    for (let i = 0; i < maxrecords; i++) {
        const event: IEvent = createEvent(faker.random.number({
            'min': 0,
            'max': max}))
        if (event !== undefined) {
            events[`id:${i}`] = event;
            if (callback !== undefined) {
                callback(event.datetime, {tag: event.tag, details: event.details});
            }
        } else {
            console.log(i)
        }
    }
    return events;
}


export const MaxRecords: number = 2048;
//export const Events: any = createRecordsObject(MaxRecords);

/*запись
fs.writeFile('./data/events.json', 
                JSON.stringify(Events, null, 2),
                    'utf8',
                        ()=>{console.log('events.json created!')})
*/