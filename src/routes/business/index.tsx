import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Input, Layout, message, Select } from '@tencent/tea-component';
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

const BusinessPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.business);

  const [text, setText] = useState('');
  const [selectPart, setSelectPart] = useState(null);

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
      businessId: 'businessId123',
      businessName: 'businessName123',
      part: '11',
      businessKinds: 'businessKinds123',
      process: '查看',
      dataProcess: '查看',
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
  const handleShowProcess = (data): void => {
    console.log(111, data);
  };
  const handleDataProcess = data => {
    console.log(222, data);
  };
  const parts = [
    { value: 's1', text: '所属部门1' },
    { value: 's2', text: '所属部门2' },
  ];
  const propsConfig = {
    list: dataList,
    columns: [
      'businessId',
      'businessName',
      'part',
      'businessKinds',
      'process',
      'dataProcess',
      'addMen',
      'createdAt',
      'action',
    ],
    left: (
      <>
        <Input
          value={text}
          onChange={(value, context) => {
            setText(value);
            console.log(value, context);
          }}
          placeholder="请输入业务名称"
        />
        <Select
          style={{ width: '200px', marginLeft: '20px' }}
          appearance="button"
          options={parts}
          value={selectPart}
          onChange={value => setSelectPart(value)}
          placeholder="请选择所属部门"
        />
      </>
    ),
    right: (
      <Button type="primary" onClick={onAdd}>
        新增业务
      </Button>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="重要业务"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <TableCommon
                {...propsConfig}
                showProcess={handleShowProcess}
                showDataProcess={handleDataProcess}
                delete={handleDelete}
              ></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default BusinessPage;
