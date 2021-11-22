import { DBTableName } from '@src/services';
import { formatDate } from '@src/utils/util';
import { Button, Card, Input, Justify, Layout, message, Select, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;
const { pageable } = Table.addons;

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
  const handleProcess = data => {
    console.log(111, data);
  };
  const handleDataProcess = data => {
    console.log(222, data);
  };
  const parts = [
    { value: 's1', text: '所属部门1' },
    { value: 's2', text: '所属部门2' },
  ];
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
                  }
                  right={
                    <>
                      <Button type="primary" onClick={onAdd}>
                        新增业务
                      </Button>
                    </>
                  }
                />
              </Table.ActionPanel>
              <Table<RecordType>
                verticalTop
                records={dataList || []}
                recordKey="id"
                bordered
                columns={[
                  {
                    key: 'businessId',
                    header: '业务ID',
                  },
                  {
                    key: 'businessName',
                    header: '业务名称',
                  },
                  {
                    key: 'part',
                    header: '所属部门',
                  },
                  {
                    key: 'businessKinds',
                    header: '业务分类',
                  },
                  {
                    key: 'process',
                    header: '业务流程',
                    render: record => {
                      return (
                        <Button
                          type="link"
                          style={{ color: 'orange' }}
                          onClick={() => {
                            handleProcess(record);
                          }}
                        >
                          查看
                        </Button>
                      );
                    },
                  },
                  {
                    key: 'dataProcess',
                    header: '数据流程',
                    render: record => {
                      return (
                        <Button
                          type="link"
                          style={{ color: 'orange' }}
                          onClick={() => {
                            handleDataProcess(record);
                          }}
                        >
                          查看
                        </Button>
                      );
                    },
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
                addons={[pageable()]}
              />
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default BusinessPage;
