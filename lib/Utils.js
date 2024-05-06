"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsGenerator = exports.createTransaction = exports.validateBeforeTransaction = exports.validateStoreName = void 0;
function validateStoreName(db, storeName) {
    return db.objectStoreNames.contains(storeName);
}
exports.validateStoreName = validateStoreName;
function validateBeforeTransaction(db, storeName, reject) {
    if (!db) {
        reject("You need to use the openDatabase function to create a database before you query it!");
    }
    if (!validateStoreName(db, storeName)) {
        reject("objectStore does not exists: ".concat(storeName));
    }
}
exports.validateBeforeTransaction = validateBeforeTransaction;
function createTransaction(db, options) {
    var trans = db.transaction(options.storeName, options.dbMode);
    trans.onerror = options.error;
    trans.oncomplete = options.complete;
    trans.onabort = options.abort;
    return trans;
}
exports.createTransaction = createTransaction;
function optionsGenerator(type, storeName, reject, resolve) {
    return {
        storeName: storeName,
        dbMode: type,
        error: function (e) {
            reject(e);
        },
        complete: function () {
            resolve();
        },
        abort: function (e) {
            reject(e);
        },
    };
}
exports.optionsGenerator = optionsGenerator;
// export function* processRequest({ request, success, error }: any) {
//   request.onerror = function(event: Event) {
//     error(error);
//     yield error;
//   };
//   request.onsuccess = function(evt: Event) {
//     let cursor: IDBCursorWithValue = (<IDBRequest>evt.target).result;
//     if (cursor) {
//       result.push(cursor.value);
//       cursor.continue();
//     } else {
//       resolve(result);
//     }
//   };
// }
//# sourceMappingURL=Utils.js.map
