"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseTransaction = void 0;
var Utils_1 = require("./Utils");
function createDatabaseTransaction(database, mode, storeName, resolve, reject, createTransaction, buildOptions) {
    if (createTransaction === void 0) { createTransaction = Utils_1.createTransaction; }
    if (buildOptions === void 0) { buildOptions = Utils_1.optionsGenerator; }
    var options = buildOptions(mode, storeName, reject, resolve);
    var transaction = createTransaction(database, options);
    var store = transaction.objectStore(storeName);
    return {
        store: store,
        transaction: transaction,
    };
}
exports.createDatabaseTransaction = createDatabaseTransaction;
//# sourceMappingURL=createDatabaseTransaction.js.map
