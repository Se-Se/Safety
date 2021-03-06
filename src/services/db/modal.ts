export const DBName = 'SecSandbox';
export const DBVersion = 8;
export const DBTableName = {
  project: 'project',
  app: 'app',
  business: 'business',
  data: 'data',
  frame: 'frame',
  recommend: 'recommend',
  gap: 'gap',
  scenes: 'scenes',
};

export const DBConfig = {
  name: DBName,
  version: DBVersion,
  // 这里定义表表结构
  objectStoresMeta: [
    {
      store: DBTableName.business,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.app,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.project,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.data,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.frame,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.recommend,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.scenes,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },

    {
      store: DBTableName.gap,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
  ],
};
