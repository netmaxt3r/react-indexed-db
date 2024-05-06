"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIndexedDB = exports.initDB = void 0;
var react_1 = require("react");
var indexed_db_1 = require("./indexed-db");
var indexeddbConfiguration = {
    version: null,
    name: null,
};
function initDB(_a) {
    var name = _a.name, version = _a.version, objectStoresMeta = _a.objectStoresMeta;
    indexeddbConfiguration.name = name;
    indexeddbConfiguration.version = version;
    Object.freeze(indexeddbConfiguration);
    (0, indexed_db_1.CreateObjectStore)(name, version, objectStoresMeta);
}
exports.initDB = initDB;
function useIndexedDB(objectStore) {
    if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
        throw new Error("Please, initialize the DB before the use.");
    }
    return (0, react_1.useMemo)(function () {
        return (0, indexed_db_1.DBOperations)(indexeddbConfiguration.name, indexeddbConfiguration.version, objectStore);
    }, [indexeddbConfiguration, objectStore]);
}
exports.useIndexedDB = useIndexedDB;
//# sourceMappingURL=indexed-hooks.js.map
