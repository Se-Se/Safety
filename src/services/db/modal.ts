export const DBName = 'SecSandbox';
export const DBVersion = 1;
export const DBTableName = {
  project: 'project',
};

export const DBConfig = {
  name: DBName,
  version: DBVersion,
  // 这里定义表表结构
  objectStoresMeta: [
    {
      store: DBTableName.project,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
  ],
};
