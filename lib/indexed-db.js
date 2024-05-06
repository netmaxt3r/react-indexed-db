"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBMode = exports.DBOperations = exports.CreateObjectStore = exports.openDatabase = void 0;
var Utils_1 = require("./Utils");
var createReadwriteTransaction_1 = require("./createReadwriteTransaction");
var createReadonlyTransaction_1 = require("./createReadonlyTransaction");
var indexedDB = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
function openDatabase(dbName, version, upgradeCallback) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open(dbName, version);
        var db;
        request.onsuccess = function () {
            db = request.result;
            resolve(db);
        };
        request.onerror = function () {
            reject("IndexedDB error: ".concat(request.error));
        };
        if (typeof upgradeCallback === "function") {
            request.onupgradeneeded = function (event) {
                upgradeCallback(event, db);
            };
        }
    });
}
exports.openDatabase = openDatabase;
function CreateObjectStore(dbName, version, storeSchemas) {
    var request = indexedDB.open(dbName, version);
    request.onupgradeneeded = function (event) {
        var database = event.target.result;
        storeSchemas.forEach(function (storeSchema) {
            if (!database.objectStoreNames.contains(storeSchema.store)) {
                var objectStore_1 = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
                storeSchema.storeSchema.forEach(function (schema) {
                    objectStore_1.createIndex(schema.name, schema.keyPath, schema.options);
                });
            }
        });
        database.close();
    };
    request.onsuccess = function (e) {
        e.target.result.close();
    };
}
exports.CreateObjectStore = CreateObjectStore;
function DBOperations(dbName, version, currentStore) {
    // Readonly operations
    var getAll = function () {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var store = (0, createReadonlyTransaction_1.createReadonlyTransaction)(db, currentStore, resolve, reject).store;
                var request = store.getAll();
                request.onerror = function (error) { return reject(error); };
                request.onsuccess = function (_a) {
                    var result = _a.target.result;
                    resolve(result);
                };
            });
        });
    };
    var getByID = function (id) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var store = (0, createReadonlyTransaction_1.createReadonlyTransaction)(db, currentStore, resolve, reject).store;
                var request = store.get(id);
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
            });
        });
    };
    var openCursor = function (cursorCallback, keyRange) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var store = (0, createReadonlyTransaction_1.createReadonlyTransaction)(db, currentStore, resolve, reject).store;
                var request = store.openCursor(keyRange);
                request.onsuccess = function (event) {
                    cursorCallback(event);
                    resolve();
                };
            });
        });
    };
    var getByIndex = function (indexName, key) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var store = (0, createReadonlyTransaction_1.createReadonlyTransaction)(db, currentStore, resolve, reject).store;
                var index = store.index(indexName);
                var request = index.get(key);
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
            });
        });
    };
    // Readwrite operations
    var add = function (value, key) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                var store = (0, createReadwriteTransaction_1.createReadwriteTransaction)(db, currentStore, resolve, reject).store;
                var request = store.add(value, key);
                request.onsuccess = function (evt) {
                    key = evt.target.result;
                    resolve(key);
                };
                request.onerror = function (error) { return reject(error); };
            });
        });
    };
    var update = function (value, key) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var _a = (0, createReadwriteTransaction_1.createReadwriteTransaction)(db, currentStore, resolve, reject), transaction = _a.transaction, store = _a.store;
                transaction.oncomplete = function (event) { return resolve(event); };
                store.put(value, key);
            });
        });
    };
    var deleteRecord = function (key) {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var store = (0, createReadwriteTransaction_1.createReadwriteTransaction)(db, currentStore, resolve, reject).store;
                var request = store.delete(key);
                request.onsuccess = function (event) { return resolve(event); };
            });
        });
    };
    var clear = function () {
        return new Promise(function (resolve, reject) {
            openDatabase(dbName, version).then(function (db) {
                (0, Utils_1.validateBeforeTransaction)(db, currentStore, reject);
                var _a = (0, createReadwriteTransaction_1.createReadwriteTransaction)(db, currentStore, resolve, reject), store = _a.store, transaction = _a.transaction;
                transaction.oncomplete = function () { return resolve(); };
                store.clear();
            });
        });
    };
    return {
        add: add,
        getByID: getByID,
        getAll: getAll,
        update: update,
        deleteRecord: deleteRecord,
        clear: clear,
        openCursor: openCursor,
        getByIndex: getByIndex,
    };
}
exports.DBOperations = DBOperations;
var DBMode;
(function (DBMode) {
    DBMode["readonly"] = "readonly";
    DBMode["readwrite"] = "readwrite";
})(DBMode || (exports.DBMode = DBMode = {}));
//# sourceMappingURL=indexed-db.js.map
