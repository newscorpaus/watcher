"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const ramda_1 = require("ramda");
const articleUpdateReport = (req, res, next) => {
    const articleIds = ramda_1.keys(db_1.db);
    const finder = (articleId) => {
        return db_1.db[articleId].valid == false;
    };
    const incompleteUpdates = ramda_1.filter(finder, articleIds);
    const incompletes = [];
    incompleteUpdates.forEach((articleId) => {
        incompletes.push(db_1.db[articleId]);
    });
    const report = {
        complete: incompletes,
        pending: incompletes,
        failed: incompletes
    };
    res.json(report);
};
exports.articleUpdateReport = articleUpdateReport;
//# sourceMappingURL=articleUpdateErrors.js.map