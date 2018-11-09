"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3Watcher = (event, ctx, cb) => {
    console.log('The event - ', JSON.stringify(event, undefined, 4));
    return cb(undefined, 'OK.');
};
exports.s3Watcher = s3Watcher;
//# sourceMappingURL=s3Handler.js.map