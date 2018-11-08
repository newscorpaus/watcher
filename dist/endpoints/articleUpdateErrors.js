"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const ramda_1 = require("ramda");
const articleUpdateReport = (req, res, next) => {
    console.log('a!!!!');
    const articleIds = ramda_1.keys(db_1.db);
    console.log('b');
    const finder = (articleId) => {
        return db_1.db[articleId].valid == false;
    };
    console.log(1);
    const incompleteUpdates = ramda_1.filter(finder, articleIds);
    const incompletes = [];
    console.log(2);
    incompleteUpdates.forEach((articleId) => {
        incompletes.push(db_1.db[articleId]);
    });
    console.log(3);
    incompletes.push('test');
    console.log('incompletes: ', incompletes);
    res.json(incompletes);
};
exports.articleUpdateReport = articleUpdateReport;
//# sourceMappingURL=articleUpdateErrors.js.map