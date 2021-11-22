import { Button, Justify, Table } from '@tencent/tea-component';
import React from 'react';
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

const TableCommon: React.FC<any> = props => {
  const getColumns = (columns: any) => {
    const allColumns = [
      // business
      {
        key: 'businessId',
        header: '业务ID',
      },
      {
        key: 'businessName',
        header: '业务名称',
      },
      {
        key: 'businessKinds',
        header: '业务分类',
      },
      {
        key: 'process',
        header: '业务流程',
      },
      {
        key: 'dataProcess',
        header: '数据流程',
      },
      //////////////////////////////
      // app

      {
        key: 'systemName',
        header: '系统名称',
      },

      {
        key: 'business',
        header: '所属业务',
      },

      // /////////////////////////////////////////
      // data
      {
        key: 'dataName',
        header: '数据名称',
      },
      {
        key: 'systemPart',
        header: '所属系统',
      },

      // frame
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
      },
      // scenes
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
      // gap
      {
        key: 'gapName',
        header: '名称',
      },
      {
        key: 'categorys',
        header: '分类',
      },
      {
        key: 'remarks',
        header: '备注说明',
      },

      //recommend
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

      /////////////////////////////////////////////////////// common
      {
        key: 'systemKinds',
        header: ' 系统类型',
      },
      {
        key: 'systemId',
        header: '系统ID',
      },
      {
        key: 'area',
        header: '所属分区',
      },
      {
        key: 'part',
        header: '所属部门',
      },
      {
        key: 'addMen',
        header: '添加人',
      },
      {
        key: 'createdAt',
        header: '添加时间',
      },
      {
        key: 'action',
        header: '操作',
      },
      ///////////////////////////////////////////////////
    ];
    let arr = [];
    allColumns.map(item => {
      if (columns.indexOf(item.key) > -1) {
        arr.push(item);
      }
    });
    console.log(999, arr);
    arr.map(item => {
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
            <Button
              type="link"
              style={{ color: '#e54545' }}
              onClick={() => {
                props.delete(record);
              }}
            >
              删除
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
      if (item.key === 'process') {
        item.render = record => {
          return (
            <Button
              type="link"
              style={{ color: 'orange' }}
              onClick={() => {
                props.showProcess(record);
              }}
            >
              查看
            </Button>
          );
        };
      }
      if (item.key === 'dataProcess') {
        item.render = record => {
          return (
            <Button
              type="link"
              style={{ color: 'orange' }}
              onClick={() => {
                props.showDataProcess(record);
              }}
            >
              查看
            </Button>
          );
        };
      }
      if (item.key === 'configurationPic') {
        item.render = record => {
          return (
            <Button
              type="link"
              style={{ color: 'orange' }}
              onClick={() => {
                props.showConfiguration(record);
              }}
            >
              查看
            </Button>
          );
        };
      }
    });
    return arr;
  };

  const arr = getColumns(props.columns);

  return (
    <>
      <Table.ActionPanel>
        <Justify left={props.left} right={props.right} />
      </Table.ActionPanel>
      <Table<RecordType>
        verticalTop
        records={props.list || []}
        recordKey="id"
        bordered
        columns={arr}
        addons={[pageable()]}
      />
      ;
    </>
  );
};

export default TableCommon;
