// db.ts

interface ObjectStoreSchemaOptions {
  unique?: boolean;
}

interface ObjectStoreSchema {
  name: string;
  options?: ObjectStoreSchemaOptions;
}

interface ObjectStoreConfig {
  name: string;
  config: {
    keyPath: string;
    autoIncrement: boolean;
  };
  schema: ObjectStoreSchema[];
}

interface IndexedDbCOnfiguration {
  version: null | number;
  name: null | string;
}

const indexeddbConfiguration: IndexedDbCOnfiguration = {
  version: null,
  name: null,
};

export interface IDBConfig {
  name: string;
  version: number;
  objectStoreConfig: ObjectStoreConfig[];
}

export const initDB = ({ name, version, objectStoreConfig }: IDBConfig) => {
  indexeddbConfiguration.name = name;
  indexeddbConfiguration.version = version;
  Object.freeze(indexeddbConfiguration);
  CreateObjectStore(name, version, objectStoreConfig);
};

export function CreateObjectStore(
  dbName: string,
  version: number,
  objectStoreConfig: ObjectStoreConfig[]
) {
  const request: IDBOpenDBRequest = indexedDB.open(dbName, version);
  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    objectStoreConfig.forEach((store) => {
      if (!db.objectStoreNames.contains(store.name)) {
        const objectStore = db.createObjectStore(store.name, store.config);

        store.schema.forEach((schema: ObjectStoreSchema) => {
          objectStore.createIndex(schema.name, schema.name, schema.options);
        });
      }
    });
  };

  request.onsuccess = (event) => {
    (event.target as IDBOpenDBRequest).result?.close();
  };
}

export function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
      reject("Please, initialize the DB before the use.");
    }
    const request = indexedDB.open(
      indexeddbConfiguration.name as string,
      indexeddbConfiguration.version as number
    );
    let db: IDBDatabase;
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onerror = () => {
      reject(`IndexedDB error: ${request.error}`);
    };
  });
}
