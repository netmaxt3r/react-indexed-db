"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadwriteTransaction = void 0;
var indexed_db_1 = require("./indexed-db");
var createDatabaseTransaction_1 = require("./createDatabaseTransaction");
function createReadwriteTransaction(database, store, resolve, reject) {
    return (0, createDatabaseTransaction_1.createDatabaseTransaction)(database, indexed_db_1.DBMode.readwrite, store, resolve, reject);
}
exports.createReadwriteTransaction = createReadwriteTransaction;
//# sourceMappingURL=createReadwriteTransaction.js.map
