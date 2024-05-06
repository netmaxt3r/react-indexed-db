import React, { ReactNode } from "react";
import { IndexedDBConfig, Key } from "./indexed-db";
type IndexedDBProps = React.PropsWithChildren<IndexedDBConfig>;
export declare function IndexedDB({ name, version, children, objectStoresMeta, }: IndexedDBProps): React.JSX.Element;
interface AccessDBProps {
    children: ({ db, }: {
        db: IDBDatabase;
        add: <T = any>(value: T, key?: any) => Promise<number>;
        getByID: <T = any>(id: number | string) => Promise<T>;
        getAll: <T = any>() => Promise<T[]>;
        update: <T = any>(value: T, key?: any) => Promise<any>;
        deleteRecord: (key: Key) => Promise<any>;
        openCursor: (cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange) => Promise<void>;
        getByIndex: (indexName: string, key: any) => Promise<any>;
        clear: () => Promise<any>;
    }) => ReactNode;
    objectStore: string;
}
export declare function AccessDB({ children, objectStore }: AccessDBProps): React.JSX.Element;
export {};
