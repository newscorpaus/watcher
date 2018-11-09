"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const article_update_1 = require("./../validators/article-update");
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});
const articleUpdate = (req, res, next) => {
    const articleId = req.params.articleId;
    client.connect((err) => {
        if (err) {
            console.log('Err connecting to lookup ', articleId);
            return next(err);
        }
        client.query(getSelectQuery(articleId), (err, results) => {
            if (err) {
                return next(err);
            }
            const reply = [article_update_1.validator(results.rows)];
            res.json(reply);
        });
    });
};
exports.articleUpdate = articleUpdate;
function getSelectQuery(articleId) {
    return `select * from ARTICLE_UPDATES where capi_id='${articleId}'`;
}
//# sourceMappingURL=articleUpdate.js.map