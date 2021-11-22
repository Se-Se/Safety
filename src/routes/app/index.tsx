import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Input, Layout, message, Select, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;
const { pageable } = Table.addons;

type RecordType = {
  id?: number;
  systemId?: string;
  systemName?: string;
  part?: string;
  business?: string;
  area?: string;
  systemKinds?: string;
  addMen?: string;
  createdAt?: string | number;
};

const AppPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.app);

  const [text, setText] = useState('');
  const [selectPart, setSelectPart] = useState(null);
  const [selectBusiness, setSelectBusiness] = useState(null);

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
    fetchList();
  }, []);

  // 点击添加按钮
  const onAdd = () => {
    add<RecordType>({
      systemId: '系统ID11',
      systemName: 'systemName111',
      part: '11',
      business: 'business111',
      area: 'area111',
      systemKinds: 'systemKinds111',
      addMen: 'addMen111',
      createdAt: +new Date(),
    })
      .then(() => {
        message.success({ content: '成功' });
        fetchList();
      })
      .catch(err => {
        message.error({ content: `失败${err}` });
      });
  };
  const handleDelete = (data: any): void => {
    console.log(333, data);
    deleteRecord(data.id)
      .then(() => {
        message.success({ content: '成功' });
        fetchList();
      })
      .catch(err => {
        message.error({ content: `失败${err}` });
      });
  };
  // 新增系统
  const addSystem = data => {
    console.log('addSystem');
    onAdd();
  };
  // 新增分区
  const addArea = data => {
    console.log('addArea');
  };
  const parts = [
    { value: 's1', text: '所属部门1' },
    { value: 's2', text: '所属部门2' },
  ];
  const businesses = [
    { value: 's1', text: '所属业务1' },
    { value: 's2', text: '所属业务2' },
  ];
  const propsConfig = {
    list: dataList,
    columns: ['systemId', 'systemName', 'part', 'business', 'area', 'systemKinds', 'addMen', 'createdAt', 'action'],
    left: (
      <>
        <Input
          value={text}
          onChange={(value, context) => {
            setText(value);
            console.log(value, context);
          }}
          placeholder="请输入系统名称"
        />
        <Select
          style={{ width: '200px', marginLeft: '20px' }}
          appearance="button"
          options={parts}
          value={selectPart}
          onChange={value => setSelectPart(value)}
          placeholder="请选择所属部门"
        />
        <Select
          style={{ width: '200px', marginLeft: '20px' }}
          appearance="button"
          options={businesses}
          value={selectBusiness}
          onChange={value => setSelectBusiness(value)}
          placeholder="请选择所属业务"
        />
      </>
    ),
    right: (
      <>
        <Button type="primary" onClick={addSystem}>
          新增系统
        </Button>
        <Button type="primary" onClick={addArea}>
          新增分区
        </Button>
      </>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="应用系统"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <TableCommon {...propsConfig} delete={handleDelete}></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default AppPage;
