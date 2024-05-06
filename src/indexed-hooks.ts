import { useMemo } from "react";
import { CreateObjectStore, DBOperations, IndexedDBConfig, Key, Model, StoreIdKey, StoreName } from "./indexed-db";

/**
 * @deprecated use IndexedDBConfig
 */
export type IndexedDBProps = IndexedDBConfig;

export interface useIndexedDB {
  dbName: string;
  version: number;
  objectStore: string;
}

const indexeddbConfiguration: { version: number; name: string } = {
  version: null,
  name: null,
};

export function initDB({ name, version, objectStoresMeta }: IndexedDBConfig) {
  indexeddbConfiguration.name = name;
  indexeddbConfiguration.version = version;
  Object.freeze(indexeddbConfiguration);
  CreateObjectStore(name, version, objectStoresMeta);
}

export function useIndexedDB<DB extends IndexedDBConfig, SN extends StoreName<DB> = StoreName<DB>>(objectStore: SN): {
  add: <T extends Model<DB, SN>>(value: Omit<T, StoreIdKey<DB, SN>>, key?: any) => Promise<number>;
  getByID: <T extends Model<DB, SN>>(id: number | string) => Promise<T>;
  getAll: <T extends Model<DB, SN>>() => Promise<T[]>;
  update: <T extends Model<DB, SN>>(value: T, key?: any) => Promise<any>;
  deleteRecord: (key: Key) => Promise<any>;
  openCursor: (
    cursorCallback: (event: Event) => void,
    keyRange?: IDBKeyRange,
  ) => Promise<void>;
  getByIndex: (indexName: string, key: any) => Promise<any>;
  clear: () => Promise<any>;
} {
  if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
    throw new Error("Please, initialize the DB before the use.");
  }
  return useMemo(
    () =>
      DBOperations(
        indexeddbConfiguration.name,
        indexeddbConfiguration.version,
        objectStore,
      ),
    [indexeddbConfiguration, objectStore],
  );
}
