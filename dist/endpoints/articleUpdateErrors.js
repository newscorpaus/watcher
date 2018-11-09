"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const ramda_1 = require("ramda");
const updateStates_1 = require("./lib/updateStates");
const articleUpdateReport = (req, res, next) => {
    updateStates_1.updateStates();
    const articleIds = ramda_1.keys(db_1.db);
    const completeFinder = (articleId) => {
        return db_1.db[articleId].status == 'complete';
    };
    const pendingFinder = (articleId) => {
        return db_1.db[articleId].status == 'pending';
    };
    const failedFinder = (articleId) => {
        return db_1.db[articleId].status == 'failed';
    };
    const completeIds = ramda_1.filter(completeFinder, articleIds);
    const pendingIds = ramda_1.filter(pendingFinder, articleIds);
    const failedIds = ramda_1.filter(failedFinder, articleIds);
    const completes = [];
    const pending = [];
    const failed = [];
    completeIds.forEach((articleId) => {
        completes.push(db_1.db[articleId]);
    });
    pendingIds.forEach((articleId) => {
        pending.push(db_1.db[articleId]);
    });
    failedIds.forEach((articleId) => {
        failed.push(db_1.db[articleId]);
    });
    const report = {
        complete: completes,
        pending: pending,
        failed: failed
    };
    res.json(report);
};
exports.articleUpdateReport = articleUpdateReport;
//# sourceMappingURL=articleUpdateErrors.js.map