"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("./../workflows/update");
const validator = (rows) => {
    // dodgy fast as invalidation
    const valid = rows.length % update_1.workflow.length == 0;
    return {
        valid: valid,
        events: rows
    };
};
exports.validator = validator;
//# sourceMappingURL=article-update.js.map