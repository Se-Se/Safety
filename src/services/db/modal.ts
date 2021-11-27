export const DBName = 'SecSandbox';
export const DBVersion = 10;
export const DBTableName = {
  trade: 'trade',
  project: 'project',
  app: 'app',
  business: 'business',
  data: 'data',
  property: 'property',
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
      storeConfig: { keyPath: 'businessId' },
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
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.app,
      storeConfig: { keyPath: 'systemId' },
      storeSchema: [
        { name: 'systemId', keypath: 'systemId', options: { unique: false } },
        { name: 'systemName', keypath: 'systemName', options: { unique: false } },
        { name: 'business', keypath: 'business', options: { unique: false } },
        { name: 'businessKinds', keypath: 'businessKinds', options: { unique: false } },
        { name: 'systemKinds', keypath: 'systemKinds', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'editMen', keypath: 'editMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'part', keypath: 'part', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
        { name: 'theBusinessId', keypath: 'theBusinessId', options: { unique: false } },
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
      storeConfig: { keyPath: 'dataId' },
      storeSchema: [
        { name: 'dataId', keypath: 'dataId', options: { unique: false } },
        { name: 'dataName', keypath: 'dataName', options: { unique: false } },
        { name: 'systemPart', keypath: 'systemPart', options: { unique: false } },
        { name: 'systemKinds', keypath: 'systemKinds', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'editMen', keypath: 'editMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.property,
      storeConfig: { keyPath: 'propertyId' },
      storeSchema: [
        { name: 'propertyId', keypath: 'propertyId', options: { unique: false } },
        { name: 'propertyName', keypath: 'propertyName', options: { unique: false } },
        { name: 'business', keypath: 'business', options: { unique: false } },
        { name: 'businessKinds', keypath: 'businessKinds', options: { unique: false } },
        { name: 'part', keypath: 'part', options: { unique: false } },
        { name: 'propertyKind', keypath: 'propertyKind', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'editMen', keypath: 'editMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
        { name: 'theBusinessId', keypath: 'theBusinessId', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.frame,
      storeConfig: { keyPath: 'areaId' },
      storeSchema: [
        { name: 'areaId', keypath: 'areaId', options: { unique: false } },
        { name: 'areaName', keypath: 'areaName', options: { unique: false } },
        { name: 'belongSystem', keypath: 'belongSystem', options: { unique: false } },
        { name: 'belongProperty', keypath: 'belongProperty', options: { unique: false } },
        { name: 'systemAndProperty', keypath: 'systemAndProperty', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'editMen', keypath: 'editMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.recommend,
      storeConfig: { keyPath: 'id'},
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
      ],
    },
    {
      store: DBTableName.scenes,
      storeConfig: { keyPath: 'scenesId' },
      storeSchema: [
        { name: 'scenesId', keypath: 'scenesId', options: { unique: false } },
        { name: 'sceneName', keypath: 'sceneName', options: { unique: false } },
        { name: 'strategy', keypath: 'strategy', options: { unique: false } },
        { name: 'attackObject', keypath: 'attackObject', options: { unique: false } },
        { name: 'loseEffect', keypath: 'loseEffect', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
      ],
    },

    {
      store: DBTableName.gap,
      storeConfig: { keyPath: 'gapId' },
      storeSchema: [
        { name: 'gapId', keypath: 'gapId', options: { unique: false } },
        { name: 'propertyOrSystem', keypath: 'propertyOrSystem', options: { unique: false } },
        { name: 'business', keypath: 'business', options: { unique: false } },
        { name: 'businessKinds', keypath: 'businessKinds', options: { unique: false } },
        { name: 'part', keypath: 'part', options: { unique: false } },
        { name: 'categorys', keypath: 'categorys', options: { unique: false } },
        { name: 'theType', keypath: 'theType', options: { unique: false } },
        { name: 'addMen', keypath: 'addMen', options: { unique: false } },
        { name: 'editedAt', keypath: 'editedAt', options: { unique: false } },
        { name: 'actType', keypath: 'actType', options: { unique: false } },
        { name: 'theBug', keypath: 'theBug', options: { unique: false } },
        { name: 'safetyTrade', keypath: 'safetyTrade', options: { unique: false } },
        { name: 'theBusinessId', keypath: 'theBusinessId', options: { unique: false } },
        
      ],
    },
  ],
};
