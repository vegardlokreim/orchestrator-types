"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callFunction = callFunction;
const functions_1 = require("firebase/functions");
// TODO: add types for function names
async function callFunction(name, params) {
    const functions = (0, functions_1.getFunctions)();
    const func = (0, functions_1.httpsCallable)(functions, name);
    const response = params ? await func(params) : await func();
    return response.data;
}
//# sourceMappingURL=callFunction.js.map