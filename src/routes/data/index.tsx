import { DBTableName } from '@src/services';
import { formatDate } from '@src/utils/util';
import { Button, Card, Input, Justify, Layout, message, Select, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  systemId?: string;
  dataName?: string;
  systemPart?: string;
  area?: string;
  systemKinds?: string;
  addMen?: string;
  createdAt?: string | number;
};

const BusinessPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const [favorite, setFavorite] = useState(null);
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.data);

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
      systemId: 'systemId111',
      dataName: 'dataName111',
      systemPart: '11',
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
  const options = [
    { value: 's1', text: '系统1' },
    { value: 's2', text: '系统2' },
  ];
  return (
    <Body>
      <Content>
        <Content.Header title="业务数据"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <Table.ActionPanel>
                <Justify
                  left={
                    <>
                      <Input
                        value={text}
                        style={{ marginRight: '20px' }}
                        onChange={(value, context) => {
                          setText(value);
                          console.log(value, context);
                        }}
                        placeholder="请输入数据名称"
                      />
                      <Select
                        style={{ width: '200px' }}
                        appearance="button"
                        options={options}
                        value={favorite}
                        onChange={value => setFavorite(value)}
                        placeholder="请选择所属系统"
                      />
                    </>
                  }
                  right={
                    <>
                      <Button type="primary" onClick={onAdd}>
                        新增数据
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
                    key: 'dataName',
                    header: '数据名称',
                  },
                  {
                    key: 'systemPart',
                    header: '所属系统',
                  },
                  {
                    key: 'area',
                    header: '所属分区',
                  },
                  {
                    key: 'systemKinds',
                    header: '系统类型',
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
                        <Button
                          type="link"
                          style={{ color: '#e54545' }}
                          onClick={() => {
                            deleteRecord(record.id)
                              .then(() => {
                                message.success({ content: '成功' });
                                fetchList();
                              })
                              .catch(err => {
                                message.error({ content: `失败${err}` });
                              });
                          }}
                        >
                          删除
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

export default BusinessPage;
