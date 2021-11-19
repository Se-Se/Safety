import { tableColumns } from '@src/utils/util';
import { Button, Justify, Table } from '@tencent/tea-component';
import React from 'react';

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

const TableCommon: React.FC<any> = props => {
  const formatterColumns = () => {
    let theArr = tableColumns(props.columns);
    theArr.map(item => {
      if (item.key === 'action') {
        item.render = (record: any, key: any, index: any) => (
          <>
            <Button
              type="link"
              onClick={() => {
                console.log(props, 666);
                props.onAction(record);
              }}
            >
              编辑
            </Button>
          </>
        );
      }
      if (item.key === 'configurationPic') {
        item.render = record => {
          return (
            <Button
              type="link"
              style={{ color: 'orange' }}
              onClick={() => {
                props.checkShow(record);
              }}
            >
              查看
            </Button>
          );
        };
      }
    });
    return theArr;
  };
  const arr = formatterColumns();

  return (
    <>
      <Table.ActionPanel>
        <Justify left={props.left} right={props.right} />
      </Table.ActionPanel>
      <Table<RecordType> verticalTop records={props.list} recordKey="id" bordered columns={arr} />;
    </>
  );
};

export default TableCommon;
