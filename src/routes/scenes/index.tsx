import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Layout, message } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  sceneName?: string;
  strategy?: string;
  attackObject?: string;
  loseEffect?: string;
  createdAt?: string | number;
};

const ScenesPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.scenes);

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
      sceneName: 'sceneName1',
      strategy: 'strategy1.',
      attackObject: 'attackObject1',
      loseEffect: 'loseEffect1',
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
    columns: ['sceneName', 'strategy', 'attackObject', 'loseEffect', 'action'],

    right: (
      <Button type="primary" onClick={onAdd}>
        添加
      </Button>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="攻击场景"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <TableCommon {...propsConfig} delete={handleDelete}></TableCommon>
              {/* <Table.ActionPanel>
                <Justify
                  right={
                    <>
                      <Button type="primary" onClick={onAdd}>
                        添加
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
                    key: 'sceneName',
                    header: '场景名称',
                  },
                  {
                    key: 'strategy',
                    header: '行动策略',
                  },
                  {
                    key: 'attackObject',
                    header: '攻击目标',
                  },
                  {
                    key: 'loseEffect',
                    header: '损失影响',
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
              /> */}
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default ScenesPage;
