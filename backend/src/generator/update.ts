import { v4 } from 'uuid';
import { workflow } from './../workflows/update';
import { Client } from 'pg';
import { times } from 'async';

const generator = (n: number, articleId = v4()): void => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'watcher'
    });

    const baseUTC = Number(Date.UTC(0, 0, 0, 0, 0, 0));

    const messageGenerator = (i: number, cb: Watcher.Callback): void => {
        const msg = {
            event: workflow[i],
            workflow: 'ArticleUpdate',
            articleId: articleId,
            created: baseUTC + getRandomMilliseconds(2000)
        };

        client.
    };

    times(n, messageGenerator, (err) => {
        if (err) {
            console.log('Err generating workflow data for ', articleId);
        }
    });
};

function getRandomMilliseconds(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}
