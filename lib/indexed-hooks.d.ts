import { IndexedDBConfig, Key, Model, StoreIdKey, StoreName } from "./indexed-db";
/**
 * @deprecated use IndexedDBConfig
 */
export type IndexedDBProps = IndexedDBConfig;
export interface useIndexedDB {
    dbName: string;
    version: number;
    objectStore: string;
}
export declare function initDB({ name, version, objectStoresMeta }: IndexedDBConfig): void;
export declare function useIndexedDB<DB extends IndexedDBConfig, SN extends StoreName<DB> = StoreName<DB>>(objectStore: SN): {
    add: <T extends Model<DB, SN>>(value: Omit<T, StoreIdKey<DB, SN>>, key?: any) => Promise<number>;
    getByID: <T extends Model<DB, SN>>(id: number | string) => Promise<T>;
    getAll: <T extends Model<DB, SN>>() => Promise<T[]>;
    update: <T extends Model<DB, SN>>(value: T, key?: any) => Promise<any>;
    deleteRecord: (key: Key) => Promise<any>;
    openCursor: (cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange) => Promise<void>;
    getByIndex: (indexName: string, key: any) => Promise<any>;
    clear: () => Promise<any>;
};
