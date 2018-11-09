"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const EVENTS_TABLE = `
CREATE TABLE IF NOT EXISTS ARTICLE_UPDATES(
    id SERIAL PRIMARY KEY,
    capi_id varchar(100) not null,
    event varchar(100) not null,
    workflow varchar(100) not null,
    received timestamp default NOW(),
    created varchar(300)
)`;
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});
console.log('Connecting to RDS ...');
client.connect((err) => {
    if (err) {
        console.log('Err connecting: ', err);
    }
    console.log('Creating ARTICLE_UPDATES (if needed) ...');
    client.query(EVENTS_TABLE, (err) => {
        if (err) {
            console.log('Err creating ARTICLE_UPDATES: ', err);
        }
        console.log('Done.');
        return;
    });
});
//# sourceMappingURL=createTable.js.map