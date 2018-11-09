"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("./update");
const uuid_1 = require("uuid");
const articleId = (process.env.ARTICLE_ID || uuid_1.v4());
let n = process.env.TIMES || 8;
n = parseInt(n);
update_1.generator(n, articleId, (err) => {
    if (err) {
        console.log('err: ', err);
    }
    console.log('Done generating for ', articleId);
});
//# sourceMappingURL=run-update.js.map