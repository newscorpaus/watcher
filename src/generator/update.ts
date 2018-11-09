
import { workflow } from './../workflows/update';
import { Client } from 'pg';
import * as moment from 'moment';
import { times } from 'async';

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});

const generator = (n: number, articleId: string, cb: Watcher.Callback): void => {
    let baseUTC = moment.utc();

    const messageGenerator = (i: number, cb: Watcher.Callback): void => {
        baseUTC = baseUTC.add(getRandomMilliseconds(3000), 'milliseconds');

        const statement = getInsertStatement(articleId, workflow[i], baseUTC);

        console.log(statement);

        client.query(statement, (err) => {
            if (err) {
                console.log('Err inserting into ARTICLE_UPDATES: ', err);
            }

            console.log('Done.');
            return;
        });
    };

    client.connect((err) => {
        if (err) {
            console.log('Err connecting: ', err);
            return;
        }

        times(n, messageGenerator, (err: Error) => {
            if (err) {
                console.log('Err generating workflow data for ', articleId);
            }

            return cb(err);
        });
    });
};

function getInsertStatement(articleId: string, workflowStep: string, created: moment.Moment): string {
    return `insert into ARTICLE_UPDATES(capi_id, event, workflow, created) values('${ articleId }', '${ workflowStep }', 'ArticleUpdates', '${ created }')`;
}

function getRandomMilliseconds(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export { generator };
