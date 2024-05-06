"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadonlyTransaction = void 0;
var indexed_db_1 = require("./indexed-db");
var createDatabaseTransaction_1 = require("./createDatabaseTransaction");
function createReadonlyTransaction(database, store, resolve, reject) {
    return (0, createDatabaseTransaction_1.createDatabaseTransaction)(database, indexed_db_1.DBMode.readonly, store, resolve, reject);
}
exports.createReadonlyTransaction = createReadonlyTransaction;
//# sourceMappingURL=createReadonlyTransaction.js.map
