import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Input, Layout, message } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  systemConId?: string;
  configurationName?: string;
  connectArea?: string;
  conSystem?: string;
  configurationPic?: string;
  addMen?: string;
  createdAt?: string | number;
};

const BusinessPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.frame);

  const [text, setText] = useState('');

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
      systemConId: 'businessId123',
      configurationName: 'businessName123',
      connectArea: '11',
      conSystem: 'businessKinds123',
      configurationPic: '查看',
      addMen: '查看',

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
  const handleAction = (data: any) => {
    console.log(111, data);
  };
  const handleConfiguration = (data: any) => {
    console.log(222, data);
  };

  const config = {
    db: 'frame',
    columns: [
      'systemConId',
      'configurationName',
      'connectArea',
      'conSystem',
      'conSystem',
      'configurationPic',
      'addMen',
      'createdAt',
      'action',
    ],

    left: (
      <Input
        value={text}
        onChange={(value, context) => {
          setText(value);
          console.log(value, context);
        }}
        placeholder="请输入业务名称"
      />
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
        <Content.Header title="系统架构"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <TableCommon
                list={dataList}
                {...config}
                checkShow={handleConfiguration}
                onAction={handleAction}
              ></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default BusinessPage;
