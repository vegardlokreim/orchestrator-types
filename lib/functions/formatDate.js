"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
function formatDate(date, locale, compress = false) {
    const options = { year: compress ? "2-digit" : "numeric", month: compress ? "numeric" : "short", day: '2-digit', hour: "numeric", minute: "numeric" };
    return date.toLocaleDateString(locale, options);
}
;
//# sourceMappingURL=formatDate.js.map