import TableCommon from '@src/components/tableCommon';
import { formatDate } from '@src/utils/util';
import { Button, Card, Input, Justify, Layout, Table } from '@tencent/tea-component';
import React, { useState } from 'react';

const { Body, Content } = Layout;

const DataPage: React.FC = () => {
  const [text, setText] = useState('');
  const handleProcess = (data: any) => {
    console.log(111, data);
  };
  const handleDataProcess = data => {
    console.log(222, data);
  };

  const config = {
    columns: [
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
        render: (record: any, key: any, index: any) => (
          <>
            <Button type="link" onClick={() => {}}>
              编辑
            </Button>
          </>
        ),
      },
    ],
  };

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
                        onChange={(value, context) => {
                          setText(value);
                          console.log(value, context);
                        }}
                        placeholder="请输入业务名称"
                      />
                    </>
                  }
                  right={
                    <>
                      <Button type="primary" onClick={() => {}}>
                        新增业务
                      </Button>
                    </>
                  }
                />
              </Table.ActionPanel>
              <TableCommon {...config}></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default DataPage;
