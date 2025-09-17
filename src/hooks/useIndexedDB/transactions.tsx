// useIndexedDB.ts
import { useState, useEffect, useCallback } from "react";
import { openDatabase } from "./db";

interface IndexedDBHookResult<T> {
  data: T[];
  loading: boolean;
  error: DOMException | null;
  fetchDataByIndex: (indexName: string, key: unknown) => Promise<unknown>;
  add: (item: Omit<T, "id">) => Promise<void>;
  update: (item: T) => Promise<void>;
  remove: (id: IDBValidKey) => Promise<void>;
  //   fetch: () => Promise<void>;
}

export const useIndexedDB = <T extends { id?: IDBValidKey }>(
  storeName: string,
  indexName?: string,
  keyValue?: unknown
): IndexedDBHookResult<T> => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DOMException | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (db) {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();
        request.onsuccess = (event: Event) => {
          setData((event.target as IDBRequest).result as T[]);
          setLoading(false);
        };

        request.onerror = (event: Event) => {
          setError((event.target as IDBRequest).error);
          setLoading(false);
        };
      } else {
        throw new Error("failed to open the db");
      }
    } catch (err) {
      setError(err as DOMException);
    }
  }, [storeName, db]);

  const fetchDataByIndex = useCallback(
    async (indexName: string, key: unknown) => {
      try {
        if (db) {
          setLoading(true);
          const transaction = db.transaction([storeName], "readonly");
          const objectStore = transaction.objectStore(storeName);
          const index = objectStore.index(indexName);
          const request = index.getAll(key as string);
          request.onsuccess = (event: Event) => {
            setData((event.target as IDBRequest).result as T[]);
            setLoading(false);
          };
          request.onerror = (event: Event) => {
            setError((event.target as IDBRequest).error);
            setLoading(false);
          };
        }
      } catch (err) {
        setLoading(false);
        setError(err as DOMException);
      }
    },
    [storeName, db]
  );

  useEffect(() => {
    const loadDB = async () => {
      try {
        const openedDb = await openDatabase();
        setDb(openedDb);
      } catch (err) {
        setError(err as DOMException);
      }
    };
    loadDB();
  }, []);

  useEffect(() => {
    return () => {
      db?.close();
    };
  }, [db]);

  const getData = useCallback(() => {
    if (!indexName) {
      fetchData();
    } else {
      fetchDataByIndex(indexName, keyValue);
    }
  }, [fetchData, fetchDataByIndex, indexName, keyValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  const add = useCallback(
    async (item: Omit<T, "id">) => {
      try {
        if (db) {
          const transaction = db.transaction([storeName], "readwrite");
          const objectStore = transaction.objectStore(storeName);
          await new Promise<void>((resolve, reject) => {
            const request = objectStore.add(item);
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
              reject((event.target as IDBRequest).error);
          });
          getData();
        }
      } catch (err) {
        setError(err as DOMException);
      }
    },
    [storeName, db, getData]
  );

  const update = useCallback(
    async (item: T) => {
      try {
        if (db) {
          const transaction = db.transaction([storeName], "readwrite");
          const objectStore = transaction.objectStore(storeName);
          await new Promise<void>((resolve, reject) => {
            const request = objectStore.put(item);
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
              reject((event.target as IDBRequest).error);
          });
          getData();
        }
      } catch (err) {
        setError(err as DOMException);
      }
    },
    [storeName, getData, db]
  );

  const remove = useCallback(
    async (id: IDBValidKey) => {
      try {
        if (db) {
          const transaction = db.transaction([storeName], "readwrite");
          const objectStore = transaction.objectStore(storeName);
          await new Promise<void>((resolve, reject) => {
            const request = objectStore.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
              reject((event.target as IDBRequest).error);
          });
          getData();
        }
      } catch (err) {
        setError(err as DOMException);
      }
    },
    [storeName, getData, db]
  );

  return { data, loading, error, fetchDataByIndex, add, update, remove };
};
