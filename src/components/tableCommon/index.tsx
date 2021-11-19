import { DBTableName } from '@src/services';
import { tableColumns } from '@src/utils/util';
import { Layout, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  businessId?: string;
  businessName?: string;
  part?: string;
  businessKinds?: string;
  process?: string;
  dataProcess?: string;
  addMen?: string;
  createdAt?: string | number;
};

const TableCommon: React.FC<any> = props => {
  console.log(props, 111111111);
  const [dataList, setDataList] = useState<any[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName[props.db]);
  let arr = [];

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        console.log(data, 123);
        setDataList(data);
      })
      .catch(() => {});
  };

  // 首次打开页面加载 第二个参数需要是空数组保证只加载一次
  useEffect(() => {
    arr = tableColumns(props.columns);
    console.log(arr, 9999999999);
    fetchList();
  }, []);

  // 点击添加按钮

  // 拉取数据

  // 首次打开页面加载 第二个参数需要是空数组保证只加载一次

  return <Table<RecordType> verticalTop records={dataList} recordKey="id" bordered columns={arr} />;
};

export default TableCommon;
