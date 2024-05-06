export type Key = string | number | Date | ArrayBufferView | ArrayBuffer | IDBKeyRange;
export interface IndexDetails {
    indexName: string;
    order: string;
}
export declare function openDatabase(dbName: string, version: number, upgradeCallback?: (e: Event, db: IDBDatabase) => void): Promise<IDBDatabase>;
export declare function CreateObjectStore(dbName: string, version: number, storeSchemas: readonly ObjectStoreMeta[]): void;
export declare function DBOperations(dbName: string, version: number, currentStore: string): {
    add: <T>(value: T, key?: any) => Promise<number>;
    getByID: <T_1>(id: string | number) => Promise<T_1>;
    getAll: <T_2>() => Promise<T_2[]>;
    update: <T_3>(value: T_3, key?: any) => Promise<any>;
    deleteRecord: (key: Key) => Promise<any>;
    clear: () => Promise<void>;
    openCursor: (cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange) => Promise<void>;
    getByIndex: (indexName: string, key: any) => Promise<any>;
};
export declare enum DBMode {
    readonly = "readonly",
    readwrite = "readwrite"
}
/**
 *   interface for data types can be extended with
 *   @example
 *   declare module 'react-indexed-db' {
 *     interface StoreDataTypes {
 *         myType: MyCustomType;
 *         myTypes: MyCustomType[];
 *     }
 *   }
 */
export interface StoreDataTypes {
    string: string;
    number: number;
    boolean: boolean;
    object: object;
    bigint: bigint;
    date: Date;
}
type ColumnTypes = keyof StoreDataTypes;
export type ColumnType<K extends ColumnTypes> = StoreDataTypes[K];
export interface ObjectStoreColumn {
    keyPath: string;
    type?: ColumnTypes;
}
export interface ObjectStoreSchema {
    name: string;
    keyPath: string;
    type?: ColumnTypes;
    options: {
        unique: boolean;
        [key: string]: any;
    };
}
export interface ObjectStoreMeta {
    store: string;
    storeConfig: {
        keyPath: string;
        autoIncrement: boolean;
        [key: string]: any;
    };
    storeSchema: readonly ObjectStoreSchema[];
    extraColumns?: readonly ObjectStoreColumn[];
}
export interface IndexedDBConfig {
    name: string;
    version: number;
    objectStoresMeta: readonly ObjectStoreMeta[];
}
export type ObjectStore<DB extends IndexedDBConfig> = DB["objectStoresMeta"];
export type StoreName<DB extends IndexedDBConfig> = ObjectStore<DB>[number]["store"];
export type StoreMeta<DB extends IndexedDBConfig, SN extends StoreName<DB>> = Extract<ObjectStore<DB>[number], {
    store: SN;
}>;
export type StoreConfig<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreMeta<DB, SN>["storeConfig"];
export type StoreIdKey<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreConfig<DB, SN>["keyPath"];
export type StoreIdModel<DB extends IndexedDBConfig, SN extends StoreName<DB>> = {
    [k in StoreIdKey<DB, SN>]: string;
};
type StoreSchema<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreMeta<DB, SN>["storeSchema"];
export type StoreIxKeys<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreSchema<DB, SN>[number]["keyPath"];
export type StoreIxSchema<DB extends IndexedDBConfig, SN extends StoreName<DB>, K extends StoreIxKeys<DB, SN>> = Extract<StoreSchema<DB, SN>[number], {
    keyPath: K;
}>;
export type StoreIxModel<DB extends IndexedDBConfig, SN extends StoreName<DB>> = {
    [k in StoreIxKeys<DB, SN>]: ColumnType<StoreIxSchema<DB, SN, k>["type"]>;
};
type StoreXtSchema<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreMeta<DB, SN>["extraColumns"];
export type StoreXKeys<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreXtSchema<DB, SN>[number]["keyPath"];
export type StoreXSchema<DB extends IndexedDBConfig, SN extends StoreName<DB>, K extends StoreIxKeys<DB, SN>> = Extract<StoreXtSchema<DB, SN>[number], {
    keyPath: K;
}>;
export type StoreXModel<DB extends IndexedDBConfig, SN extends StoreName<DB>> = {
    [k in StoreXKeys<DB, SN>]: ColumnType<StoreXSchema<DB, SN, k>["type"]>;
};
export type Model<DB extends IndexedDBConfig, SN extends StoreName<DB>> = StoreIdModel<DB, SN> & StoreIxModel<DB, SN> & StoreXModel<DB, SN>;
export {};
