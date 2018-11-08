"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db");
const uploadEndpoint = (req, res, next) => {
    console.log(' ------ > ');
    db_1.update(req.body);
    res.send('Ok.');
};
exports.uploadEndpoint = uploadEndpoint;
//# sourceMappingURL=upload.js.map