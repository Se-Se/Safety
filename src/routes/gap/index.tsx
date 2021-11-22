import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Layout, message } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  gapName?: string;
  categorys?: string;
  remarks?: string;
  createdAt?: string | number;
};

const GapPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.gap);

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
      gapName: 'gapName1',
      categorys: 'categorys1',
      remarks: 'remarks1',
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
  const propsConfig = {
    list: dataList,
    columns: ['gapName', 'categorys', 'remarks', 'action'],

    right: (
      <Button type="primary" onClick={onAdd}>
        增加
      </Button>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="手法与漏洞"></Content.Header>
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

export default GapPage;
