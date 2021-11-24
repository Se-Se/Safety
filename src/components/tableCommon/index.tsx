import { Button, Justify, Table, Icon } from '@tencent/tea-component';
import React, { useState } from 'react';
import { formatDate } from '@src/utils/util';
const { pageable, selectable } = Table.addons;

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
        header: '业务大类',
      },
      {
        key: 'businessPic',
        header: '业务资产图',
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
        key: 'editMen',
        header: '修改人',
      },
      {
        key: 'editedAt',
        header: '最后修改时间',
      },
      {
        key: 'action',
        header: '操作',
      },
      ///////////////////////////////////////////////////
    ];
    let arr = [];
    columns.map(item => {
      allColumns.map(column => {
        if (item === column.key) {
          arr.push(column);
        }
      });
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
      if (item.key === 'businessPic') {
        item.render = record => {
          return (
            <Button
              type="link"
              onClick={() => {
                props.showPic(record);
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
      if (item.key === 'createdAt') {
        item.render = record => formatDate(record.createdAt);
      }
      if (item.key === 'editedAt') {
        item.render = record => formatDate(record.editedAt);
      }
    });
    return arr;
  };

  const arr = getColumns(props.columns);
  const [selectedKeys, setSelectedKeys] = useState([]);

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
        addons={[
          pageable(),
          selectable({
            value: selectedKeys,
            onChange: (keys, context) => {
              console.log(keys, context);
              setSelectedKeys(keys);
            },
            rowSelect: true,
            render: (element, { disabled }) => {
              return disabled ? <Icon type="loading" /> : element;
            },
          }),
        ]}
        className="common-table"
      />
    </>
  );
};

export default TableCommon;
