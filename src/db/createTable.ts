import { Client } from 'pg';

const EVENTS_TABLE = `
CREATE TABLE IF NOT EXISTS TEMPLATE_EVENTS(
    id SERIAL PRIMARY KEY,
    event varchar(100) not null,
    payload json not null,
    when timestamp default NOW()
)`;

const client = new Client({
    host: 'watcher-development.ct65yek9ohzb.ap-southeast-2.rds.amazonaws.com',
    port: 5432,
    user: 'dcsadmin',
    password: 'dcsy3s123'
});

console.log('Connecting to RDS ...');

client.connect((err) => {
    if (err) {
        console.log('Err connecting: ', err);
    }

    console.log('Creating TEMPLATE_EVENTS (if needed) ...');

    client.query(EVENTS_TABLE, (err) => {
        if (err) {
            console.log('Err creating TEMPLATE_EVENTS: ', err);
        }

        console.log('Done.');
    });
});

