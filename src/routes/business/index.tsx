import { DBTableName } from '@src/services';
import { formatDate } from '@src/utils/util';
import { Button, Card, Justify, Layout, message, Table } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  name?: string;
  type?: string;
  createdAt?: string | number;
};

const BusinessPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.project);

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
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
    add<RecordType>({ name: 'xxxx', type: 'x', createdAt: +new Date() })
      .then(() => {
        message.success({ content: '成功' });
        fetchList();
      })
      .catch(err => {
        message.error({ content: `失败${err}` });
      });
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
                    <Button type="primary" onClick={onAdd}>
                      新增
                    </Button>
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
                    key: 'id',
                    header: 'ID',
                  },
                  {
                    key: 'name',
                    header: 'Name',
                  },
                  {
                    key: 'type',
                    header: '类型',
                  },
                  {
                    key: 'createdAt',
                    header: '创建时间',
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
