"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let db = {};
exports.db = db;
function update(data) {
    exports.db = db = data;
}
exports.update = update;
function data() {
    return db;
}
//# sourceMappingURL=index.js.map