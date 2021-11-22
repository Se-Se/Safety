import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Layout, message } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  recommendName?: string;
  category_1?: string;
  category_2?: string;
  describe?: string;
  createdAt?: string | number;
};

const RecommendPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.recommend);

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
      recommendName: 'businessName123',
      category_1: '11',
      category_2: 'businessKinds123',
      describe: 'describe',
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
    columns: ['recommendName', 'category_1', 'category_2', 'describe', 'action'],

    right: (
      <Button type="primary" onClick={onAdd}>
        增加
      </Button>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="改进建议"></Content.Header>
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
                    key: 'recommendName',
                    header: '建议名称',
                  },
                  {
                    key: 'category_1',
                    header: '一级分类',
                  },
                  {
                    key: 'category_2',
                    header: '二级分类',
                  },
                  {
                    key: 'describe',
                    header: '详细描述',
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

export default RecommendPage;
