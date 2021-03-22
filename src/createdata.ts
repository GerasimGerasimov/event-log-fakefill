import faker = require('faker');
import { EventsMap, IEventDetails } from './EventsSourceToMap';
import { IEvent } from './iDBEvent';

function readEventsMap(): {key: string, item: IEventDetails} | undefined{
    let i: number = 0;
    let max: number = EventsMap.size - 1;
    const index: number = (faker.random.number({'min': 0, 'max': max}))
    for (const [key, item] of EventsMap.entries()) {
        if ( i++ === index ) return ({key, item});
      }
    return undefined;
}

const event_types = new Map([
    ['i', 'info'],
    ['a', 'alarm'],
    ['w', 'warning'],
  ]);

export function createEvent(): IEvent | undefined{
    //случайное время (нужен формат "2020-09-26T16:18:36.036Z")
    const datetime: any = faker.date.recent(30);
    const date: string = DateTimeToDBStr(datetime);
    const utime: number = DateTimeToDBInt(datetime);

    //читаю случайное событие
    const mapData: {key: string, item: IEventDetails} | undefined = readEventsMap();
    if (mapData === undefined) return undefined;
    const {key, item} = {... mapData}
    const event: IEvent = {
        utime,
        date,
        type:event_types.get(item.type),
        trig: faker.random.arrayElement(['FRONT','REAR','TOUGLE']),
        tag: `U1/RAM/${key}`,
        details: item
    }
    return event;
}

export function DateTimeToDBStr(date: Date): string {
    return date.toString().split(' ').slice(1, 6).join(' ');
}

export function DateTimeToDBInt(date: Date): number {
    return date.getTime()
}
