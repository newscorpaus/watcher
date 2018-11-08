"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const articleUpdate = (req, res, next) => {
    const articleId = req.params.articleId;
    res.json(db_1.db[articleId]);
};
exports.articleUpdate = articleUpdate;
//# sourceMappingURL=articleUpdate.js.map