import { Client } from 'pg';

const EVENTS_TABLE = `
CREATE TABLE IF NOT EXISTS EVENTS(
    id SERIAL PRIMARY KEY,
    event varchar(100) not null,
    workflow varchar(100) not null,
    payload json not null,
    created timestamp default NOW()
)`;

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});

console.log('Connecting to RDS ...');

client.connect((err) => {
    if (err) {
        console.log('Err connecting: ', err);
    }

    console.log('Creating TEMPLATE_EVENTS (if needed) ...');

    client.query(EVENTS_TABLE, (err) => {
        if (err) {
            console.log('Err creating EVENTS: ', err);
        }

        console.log('Done.');
        return;
    });
});

