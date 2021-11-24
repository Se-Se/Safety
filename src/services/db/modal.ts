export const DBName = 'SecSandbox';
export const DBVersion = 9;
export const DBTableName = {
  trade: 'trade',
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
      store: DBTableName.trade,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'tradeN', keypath: 'tradeN', options: { unique: false } },
        { name: 'description', keypath: 'description', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.business,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'businessId', keypath: 'businessId', options: { unique: false } },
        { name: 'businessName', keypath: 'businessName', options: { unique: false } },
        { name: 'part', keypath: 'part', options: { unique: false } },
        { name: 'businessKinds', keypath: 'businessKinds', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'editMen', keypath: 'editMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'businessPic', keypath: 'businessPic', options: { unique: false } },
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
