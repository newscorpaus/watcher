"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const update_1 = require("./../workflows/update");
const async_1 = require("async");
const db_1 = require("./../db");
const uuid = require("uuid");
let inserted = [];
const generatorEndpoint = (req, res, next) => {
    let times = req.query.times;
    const random = req.query.random;
    if (random) {
        times = Math.floor(Math.random() * Math.floor(8));
    }
    const articleId = req.query.articleId || uuid.v4();
    generator(times, articleId, () => {
        res.json(inserted);
        inserted = [];
    });
};
exports.generatorEndpoint = generatorEndpoint;
const generator = (n, articleId, cb) => {
    let baseUTC = moment.utc();
    const messageGenerator = (i, cb) => {
        baseUTC = baseUTC.add(getRandomMilliseconds(3000), 'milliseconds');
        if (!db_1.db[articleId]) {
            db_1.db[articleId] = {
                valid: false,
                events: []
            };
        }
        const entry = {
            capi_id: articleId,
            event: update_1.workflow[i],
            workflow: 'ArticleUpdates',
            created: baseUTC
        };
        db_1.db[articleId].events.push(entry);
        inserted.push(entry);
        if (n == 8) {
            db_1.db[articleId].valid = true;
        }
        cb();
    };
    async_1.times(n, messageGenerator, (err) => {
        if (err) {
            console.log('Err generating workflow data for ', articleId);
        }
        return cb(err);
    });
};
function getRandomMilliseconds(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//# sourceMappingURL=generator.js.map