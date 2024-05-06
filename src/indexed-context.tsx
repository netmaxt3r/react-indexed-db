import React, { ReactNode } from "react";
import { DBOperations, IndexedDBConfig, Key, ObjectStoreMeta, ObjectStoreSchema, openDatabase } from "./indexed-db";


type IndexedDBProps = React.PropsWithChildren<IndexedDBConfig>

const IndexedDBContext = React.createContext<{
  db: any;
  name: string;
  version: number;
}>({
  db: null,
  name: null,
  version: null,
});

const IndexedDBProvider = IndexedDBContext.Provider;
const IndexedDBCosumer = IndexedDBContext.Consumer;

export function IndexedDB({
  name,
  version,
  children,
  objectStoresMeta,
}: IndexedDBProps) {
  objectStoresMeta.forEach(async (schema: ObjectStoreMeta) => {
    await openDatabase(name, version, (event: any) => {
      const db: IDBDatabase = event.currentTarget.result;
      const objectStore = db.createObjectStore(
        schema.store,
        schema.storeConfig,
      );
      schema.storeSchema.forEach((schema: ObjectStoreSchema) => {
        objectStore.createIndex(schema.name, schema.keyPath, schema.options);
      });
    });
  });
  return (
    <IndexedDBProvider value={{ db: null, name, version }}>
      {children}
    </IndexedDBProvider>
  );
}

interface AccessDBProps {
  children: ({
    db,
  }: {
    db: IDBDatabase;
    add: <T = any>(value: T, key?: any) => Promise<number>;
    getByID: <T = any>(id: number | string) => Promise<T>;
    getAll: <T = any>() => Promise<T[]>;
    update: <T = any>(value: T, key?: any) => Promise<any>;
    deleteRecord: (key: Key) => Promise<any>;
    openCursor: (
      cursorCallback: (event: Event) => void,
      keyRange?: IDBKeyRange,
    ) => Promise<void>;
    getByIndex: (indexName: string, key: any) => Promise<any>;
    clear: () => Promise<any>;
  }) => ReactNode;
  objectStore: string;
}

export function AccessDB({ children, objectStore }: AccessDBProps) {
  return (
    <IndexedDBCosumer>
      {(value) => {
        const { db, name, version } = value;
        // openDatabase(name, version);
        return children({ db, ...DBOperations(name, version, objectStore) });
      }}
    </IndexedDBCosumer>
  );
}
