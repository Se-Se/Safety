import { DBTableName } from '@src/services';
import { formatDate } from '@src/utils/util';
import { Button, Card, Input, Justify, Layout, message, Select, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;
const { pageable } = Table.addons;

type RecordType = {
  id?: number;
  systemConId?: string;
  configurationName?: string;
  relationArea?: string;
  relationSystem?: string;
  configurationPic?: string;
  addMen?: string;
  createdAt?: string | number;
};

const testData = [
  {
    id: 1,
    systemConId: 'systemConId11',
    configurationName: '11',
    relationArea: 'relationArea11',
    relationSystem: 'relationSystem1110000000',
    configurationPic: '查看',
    addMen: 'addMen111',
    createdAt: +new Date(),
  },
  {
    id: 2,
    systemConId: 'systemConId11',
    configurationName: '222',
    relationArea: 'relationArea11',
    relationSystem: 'relationSystem1110000000',
    configurationPic: '查看',
    addMen: 'addMen111',
    createdAt: +new Date(),
  },
  {
    id: 3,
    systemConId: 'systemConId11',
    configurationName: '3',
    relationArea: 'relationArea11',
    relationSystem: 'relationSystem1110000000',
    configurationPic: '查看',
    addMen: 'addMen111',
    createdAt: +new Date(),
  },
  {
    id: 4,
    systemConId: 'systemConId11',
    configurationName: '4',
    relationArea: 'relationArea11',
    relationSystem: 'relationSystem1110000000',
    configurationPic: '查看',
    addMen: 'addMen111',
    createdAt: +new Date(),
  },
  {
    id: 5,
    systemConId: 'systemConId11',
    configurationName: '5',
    relationArea: 'relationArea11',
    relationSystem: 'relationSystem1110000000',
    configurationPic: '查看',
    addMen: 'addMen111',
    createdAt: +new Date(),
  },
];

const FramePage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.frame);

  const [text, setText] = useState('');
  const [selectSys, setSelectSys] = useState(null);
  const [selectArea, setSelectArea] = useState(null);

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
      systemConId: 'systemConId11',
      configurationName: '11',
      relationArea: 'relationArea11',
      relationSystem: 'relationSystem1110000000',
      configurationPic: '查看',
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
  const systems = [
    { value: 's1', text: '系统1' },
    { value: 's2', text: '系统2' },
  ];
  const areas = [
    { value: 's1', text: '相关分区1' },
    { value: 's2', text: '相关分区2' },
  ];
  return (
    <Body>
      <Content>
        <Content.Header title="系统架构"></Content.Header>
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
                        placeholder="请输入架构名称"
                      />
                      <Select
                        style={{ width: '200px', marginLeft: '20px' }}
                        appearance="button"
                        options={areas}
                        value={selectArea}
                        onChange={value => setSelectArea(value)}
                        placeholder="请选择关联分区"
                      />
                      <Select
                        style={{ width: '200px', marginLeft: '20px' }}
                        appearance="button"
                        options={systems}
                        value={selectSys}
                        onChange={value => setSelectSys(value)}
                        placeholder="请选择关联系统"
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
                    key: 'systemConId',
                    header: '系统架构ID',
                  },
                  {
                    key: 'configurationName',
                    header: '架构名称',
                  },
                  {
                    key: 'relationArea',
                    header: '相关分区',
                  },
                  {
                    key: 'relationSystem',
                    header: '相关系统',
                  },
                  {
                    key: 'configurationPic',
                    header: '架构图',
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

export default FramePage;
