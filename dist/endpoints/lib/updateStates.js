"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const moment = require("moment");
const db_1 = require("./../../db");
const updateStates = () => {
    const articleIds = ramda_1.keys(db_1.db);
    const updater = (articleId) => {
        const article = db_1.db[articleId];
        if (article.status == 'complete') {
            return;
        }
        const lastEvent = article.events[article.events.length - 1];
        const then = moment(lastEvent.received);
        const fiveMinutesAgo = moment().subtract(10, 'seconds');
        if (then.isBefore(fiveMinutesAgo)) {
            article.status = 'failed';
        }
    };
    articleIds.forEach(updater);
};
exports.updateStates = updateStates;
//# sourceMappingURL=updateStates.js.map