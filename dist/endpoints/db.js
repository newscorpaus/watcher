"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const updateStates_1 = require("./lib/updateStates");
const dbEndpoint = (req, res, next) => {
    updateStates_1.updateStates();
    res.json(db_1.db);
};
exports.dbEndpoint = dbEndpoint;
//# sourceMappingURL=db.js.map