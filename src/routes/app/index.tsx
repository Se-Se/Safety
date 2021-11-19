import { DBTableName } from '@src/services';
import { formatDate } from '@src/utils/util';
import { Button, Card, Input, Justify, Layout, message, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

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
  const handleProcess = data => {
    console.log(111, data);
  };
  const handleDataProcess = data => {
    console.log(222, data);
  };
  // 新增系统
  const addSystem = data => {
    console.log('addSystem');
  };
  // 新增分区
  const addArea = data => {
    console.log('addArea');
  };
  return (
    <Body>
      <Content>
        <Content.Header title="重要业务"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <Table.ActionPanel>
                <Justify
                  left={
                    <>
                      <Input
                        value={text}
                        onChange={(value, context) => {
                          setText(value);
                          console.log(value, context);
                        }}
                        placeholder="请输入系统名称"
                      />
                    </>
                  }
                  right={
                    <>
                      <Button type="primary" onClick={addSystem}>
                        新增系统
                      </Button>
                      <Button type="primary" onClick={addArea}>
                        新增分区
                      </Button>
                    </>
                  }
                />
              </Table.ActionPanel>
              <Table<RecordType>
                verticalTop
                records={dataList}
                recordKey="id"
                bordered
                columns={[
                  {
                    key: 'systemId',
                    header: '系统ID',
                  },
                  {
                    key: 'systemName',
                    header: '系统名称',
                  },
                  {
                    key: 'part',
                    header: '所属部门',
                  },
                  {
                    key: 'business',
                    header: '所属业务',
                  },
                  {
                    key: 'area',
                    header: '所属分区',
                  },
                  {
                    key: 'systemKinds',
                    header: ' 系统类型',
                  },
                  {
                    key: 'addMen',
                    header: '添加人',
                  },
                  {
                    key: 'createdAt',
                    header: '添加时间',
                    render: record => formatDate(record.createdAt),
                  },
                  {
                    key: 'action',
                    header: '操作',
                    width: 100,
                    render: (record, key, index) => (
                      <>
                        <Button
                          type="link"
                          onClick={() => {
                            update<RecordType>({ ...record, id: record.id, createdAt: +new Date() })
                              .then(() => {
                                message.success({ content: '成功' });
                                fetchList();
                              })
                              .catch(err => {
                                message.error({ content: `失败${err}` });
                              });
                          }}
                        >
                          编辑
                        </Button>
                      </>
                    ),
                  },
                ]}
              />
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default AppPage;
