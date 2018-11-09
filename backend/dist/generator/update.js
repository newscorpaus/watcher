"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("./../workflows/update");
const pg_1 = require("pg");
const moment = require("moment");
const async_1 = require("async");
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});
const generator = (n, articleId, cb) => {
    let baseUTC = moment.utc();
    const messageGenerator = (i, cb) => {
        baseUTC = baseUTC.add(getRandomMilliseconds(3000), 'milliseconds');
        const statement = getInsertStatement(articleId, update_1.workflow[i], baseUTC);
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
        async_1.times(n, messageGenerator, (err) => {
            if (err) {
                console.log('Err generating workflow data for ', articleId);
            }
            return cb(err);
        });
    });
};
exports.generator = generator;
function getInsertStatement(articleId, workflowStep, created) {
    return `insert into ARTICLE_UPDATES(capi_id, event, workflow, created) values('${articleId}', '${workflowStep}', 'ArticleUpdates', '${created}')`;
}
function getRandomMilliseconds(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//# sourceMappingURL=update.js.map