import type { IDBConfig } from "../hooks/useIndexedDB/db";

export const DBConfig: IDBConfig = {
  name: "NotesDB",
  version: 1,
  objectStoreConfig: [
    {
      name: "notes",
      config: { keyPath: "id", autoIncrement: true },
      schema: [
        { name: "title", options: { unique: false } },
        { name: "content", options: { unique: false } },
        { name: "category", options: { unique: false } },
        { name: "date", options: { unique: false } },
        {
          name: "isArchived",
          options: { unique: false },
        },
      ],
    },
  ],
};
