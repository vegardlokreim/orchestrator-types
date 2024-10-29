"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampToDate = timestampToDate;
function timestampToDate(timestamp, throwError = false) {
    if (!timestamp) {
        if (!throwError)
            return new Date(0);
        throw new Error("Timestamp is undefined");
    }
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}
//# sourceMappingURL=timestampToDate.js.map