"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});
const articleUpdateErrors = (req, res, next) => {
    const articleId = req.params.articleId;
    res.send({ 'message': 'Consider yourself surprised. There have been some wonderful moments in article updating in the last 10 minutes!' });
};
exports.articleUpdateErrors = articleUpdateErrors;
function getSelectQuery(articleId) {
    return `select * from ARTICLE_UPDATES where capi_id='${articleId}'`;
}
//# sourceMappingURL=articleUpdateErrors.js.map