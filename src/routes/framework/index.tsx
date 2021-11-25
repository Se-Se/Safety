import BreadcrumbPage from '@src/components/crumb';
import TableCommon from '@src/components/tableCommon';
import AddModal from '@src/components/tableCommon/addModal';
import { DBTableName } from '@src/services';
import { Button, Card, Layout, message } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';

const { Body, Content } = Layout;
const propertyOption = [
  {
    label: '网络',
    value: '网络',
    children: [
      { label: '交换机', value: '交换机' },
      { label: '路由器', value: '路由器' },
      { label: '防火墙', value: '防火墙' },
      { label: '堡垒机', value: '堡垒机' },
      { label: 'IPS', value: 'IPS' },
      { label: 'IDS', value: 'IDS' },
    ],
  },
  {
    label: '客户端',
    value: '客户端',
    children: [
      { label: '浏览器', value: '浏览器' },
      { label: '手机', value: '手机' },
      { label: 'PC终端', value: 'PC终端' },
      { label: 'PDA手持设备', value: 'PDA手持设备' },
      { label: 'ATM终端', value: 'ATM终端' },
    ],
  },
  {
    label: '服务器',
    value: '服务器',
    children: [
      { label: 'web服务器', value: 'web服务器' },
      { label: '邮件服务器', value: '邮件服务器' },
      { label: '应用服务器', value: '应用服务器' },
      { label: '应用服务器集群', value: '应用服务器集群' },
    ],
  },
  {
    label: '数据存储',
    value: '数据存储',
    children: [
      { label: '数据仓库', value: '数据仓库' },
      { label: '关系型数据库', value: '关系型数据库' },
      { label: 'NoSql数据库', value: 'NoSql数据库' },
      { label: '文件数据库', value: '文件数据库' },
    ],
  },
];
type PropertyType = {
  id?: number;
  areaId?: string;
  areaName?: string;
  systemAndProperty?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
};
const crumb = [
  { name: '银行', link: '/main' },
  { name: '分区管理', link: '/framework' },
];
const systemKOptions = [
  { value: 'all', text: '所以类型' },
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];
const PropertyPage: React.FC = () => {
  const [dataList, setDataList] = useState<PropertyType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.frame);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [checkItem, setCheckItem] = useState([]);

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

  const handleModalClose = () => {
    setShowModal(false);
    // setTradeData(null);
  };

  const handleSave = () => {
    fetchList();
  };

  // 点击添加按钮
  const onAdd = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  //表格checkbox被选中
  const handleSelectItems = data => {
    setCheckItem(data);
  };

  // 删除button
  const handleDelete = (): void => {
    if (checkItem.length) {
      checkItem.map((item, index) => {
        deleteRecord(Number(item))
          .then(() => {
            if (index === checkItem.length - 1) {
              message.success({ content: '成功' });
              fetchList();
            }
          })
          .catch(err => {
            message.error({ content: `失败${err}` });
          });
      });
    }
  };

  const propsConfig = {
    list: dataList,
    columns: ['areaId', 'areaName', 'systemAndProperty', 'addMen', 'createdAt', 'editMen', 'editedAt'],
    left: <></>,
    right: (
      <>
        <Button type="primary" onClick={onAdd}>
          新增系统
        </Button>
        <Button type="weak" onClick={handleDelete}>
          删除
        </Button>
      </>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header
          subtitle={
            <>
              <BreadcrumbPage crumbs={crumb} />
            </>
          }
        ></Content.Header>
        <Content.Body className="common-table-content">
          <Card>
            <Card.Body>
              <AddModal
                close={handleModalClose}
                isEdit={isEdit}
                save={handleSave}
                theData={modalData}
                allData={dataList}
                visible={showModal}
                propertyOption={propertyOption}
                comName={'frame'}
              />
              <TableCommon {...propsConfig} selectItems={handleSelectItems}></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default PropertyPage;

// import TableCommon from '@src/components/tableCommon';
// import { DBTableName } from '@src/services';
// import { useHistory } from '@tea/app';
// import { Button, Card, Input, Layout, message, Select } from '@tencent/tea-component';
// import React, { useEffect, useState } from 'react';
// import { useIndexedDB } from 'react-indexed-db';
// const { Body, Content } = Layout;

// type RecordType = {
//   id?: number;
//   systemConId?: string;
//   configurationName?: string;
//   relationArea?: string;
//   relationSystem?: string;
//   configurationPic?: string;
//   addMen?: string;
//   createdAt?: string | number;
// };

// const FramePage: React.FC = () => {
//   const [dataList, setDataList] = useState<RecordType[]>();
//   const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.frame);

//   const [text, setText] = useState('');
//   const [selectSys, setSelectSys] = useState(null);
//   const [selectArea, setSelectArea] = useState(null);

//   const history = useHistory();

//   // 拉取数据
//   const fetchList = () => {
//     getAll()
//       .then(data => {
//         console.log(data, 123);
//         setDataList(data);
//       })
//       .catch(() => {});
//   };

//   // 首次打开页面加载 第二个参数需要是空数组保证只加载一次
//   useEffect(() => {
//     fetchList();
//   }, []);

//   // 点击添加按钮
//   const onAdd = () => {
//     add<RecordType>({
//       systemConId: 'systemConId11',
//       configurationName: '11',
//       relationArea: 'relationArea11',
//       relationSystem: 'relationSystem1110000000',
//       configurationPic: '查看',
//       addMen: 'addMen111',
//       createdAt: +new Date(),
//     })
//       .then(() => {
//         message.success({ content: '成功' });
//         fetchList();
//       })
//       .catch(err => {
//         message.error({ content: `失败${err}` });
//       });
//   };

//   const handleDelete = (data: any): void => {
//     console.log(333, data);
//     deleteRecord(data.id)
//       .then(() => {
//         message.success({ content: '成功' });
//         fetchList();
//       })
//       .catch(err => {
//         message.error({ content: `失败${err}` });
//       });
//   };
//   const handleShowConfiguration = data => {
//     console.log(111, data);
//     history.push('/configuration');
//   };

//   const systems = [
//     { value: 's1', text: '系统1' },
//     { value: 's2', text: '系统2' },
//   ];
//   const areas = [
//     { value: 's1', text: '相关分区1' },
//     { value: 's2', text: '相关分区2' },
//   ];
//   const propsConfig = {
//     list: dataList,
//     columns: [
//       'systemConId',
//       'configurationName',
//       'relationArea',
//       'relationSystem',
//       'configurationPic',
//       'addMen',
//       'createdAt',
//       'action',
//     ],
//     left: (
//       <>
//         <Input
//           value={text}
//           onChange={(value, context) => {
//             setText(value);
//             console.log(value, context);
//           }}
//           placeholder="请输入架构名称"
//         />
//         <Select
//           style={{ width: '200px', marginLeft: '20px' }}
//           appearance="button"
//           options={areas}
//           value={selectArea}
//           onChange={value => setSelectArea(value)}
//           placeholder="请选择关联分区"
//         />
//         <Select
//           style={{ width: '200px', marginLeft: '20px' }}
//           appearance="button"
//           options={systems}
//           value={selectSys}
//           onChange={value => setSelectSys(value)}
//           placeholder="请选择关联系统"
//         />
//       </>
//     ),
//     right: (
//       <Button type="primary" onClick={onAdd}>
//         新增数据
//       </Button>
//     ),
//   };
//   return (
//     <Body>
//       <Content>
//         <Content.Header title="系统架构"></Content.Header>
//         <Content.Body>
//           <Card>
//             <Card.Body>
//               <TableCommon
//                 {...propsConfig}
//                 showConfiguration={handleShowConfiguration}
//                 delete={handleDelete}
//               ></TableCommon>
//             </Card.Body>
//           </Card>
//         </Content.Body>
//       </Content>
//     </Body>
//   );
// };

// export default FramePage;
