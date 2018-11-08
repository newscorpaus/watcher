"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const dbEndpoint = (req, res, next) => {
    res.json(db_1.db);
};
exports.dbEndpoint = dbEndpoint;
//# sourceMappingURL=db.js.map