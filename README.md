# event-log-sqlite
Журнал событий на БД SQLite.
Создаётся 2048 рандомных записей
используя секцию Events из ini-файла VTEG

## Полезная инфа и заметки
url to example: https://stackabuse.com/a-sqlite-tutorial-with-node-js/
Для установки sqllite и компиляции под целевую платформу:
npm install sqlite3 --build-from-source=sqlite3

## Схема таблицы:

CREATE TABLE events (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    date    TEXT,
    type    TEXT,
    tag     TEXT,
    details TEXT
);

## Данные:

id   | date                   |type| tag     | details
  2018 |2020-09-30T09:47:19.534Z| a	 |UstMaxFlt|{"initialValue":"0",
                                              "comment":"...",
                                              "todo":"..."}
