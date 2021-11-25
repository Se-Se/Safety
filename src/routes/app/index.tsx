import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Input, Layout, message, Select, Row, Col } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import BreadcrumbPage from '@src/components/crumb';
import AddModal from './components/addModal';

const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  businessId?: string;
  businessName?: string;
  part?: string;
  businessKinds?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
  businessPic?: string;
};
const crumb = [
  { name: '银行', link: '/main' },
  { name: '应用系统', link: '/app' },
];
const AppPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const [allList, setAllList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.business);

  const [businessN, setBusinessN] = useState('');
  const [selectPart, setSelectPart] = useState('');
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
        setAllList(data);
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

  // 搜索框搜索
  const handleInputChange = (value, attr) => {
    if (attr === 'businessN') {
      setBusinessN(value);
    }
    if (attr === 'selectPart') {
      setSelectPart(value);
    }
  };
  const filterDataList = (arr: any) => {
    if (!arr) {
      return [];
    }
    if (businessN.trim() === '' && selectPart.trim() === '') {
      return arr;
    }
    let filterArr = [];
    if (businessN.trim() === '' && selectPart.trim() !== '') {
      arr.map((item: any) => {
        if (item.part === selectPart) {
          filterArr.push(item);
        }
      });
      return filterArr;
    }

    if (businessN.trim() !== '' && selectPart.trim() === '') {
      arr.map((item: any) => {
        if (item.businessName === businessN) {
          filterArr.push(item);
        }
      });
      return filterArr;
    }
    if (businessN.trim() !== '' && selectPart.trim() !== '') {
      arr.map((item: any) => {
        if (item.businessName === businessN && item.part === selectPart) {
          filterArr.push(item);
        }
      });
      return filterArr;
    }
  };

  useEffect(() => {
    let arr = filterDataList(allList);
    setDataList([...arr]);
    console.log(12332112321, businessN, selectPart);
  }, [businessN, selectPart]);
  //表格checkbox被选中
  const handleSelectItems = data => {
    setCheckItem(data);
  };
  const handleDelete = (): void => {
    console.log(333, checkItem);
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
  const handleShowPic = (data): void => {
    console.log(111, data);
    setModalData(data);
  };

  const parts = [
    { value: 's1', text: '所属部门1' },
    { value: 's2', text: '所属部门2' },
  ];
  const propsConfig = {
    list: dataList,
    columns: [
      'businessId',
      'businessName',
      'part',
      'businessKinds',
      // 'process',
      // 'dataProcess',
      'addMen',
      'createdAt',
      'editMen',
      'editedAt',
      'businessPic',
    ],
    left: (
      <Row>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            业务名称:
          </Button>
        </Col>
        <Col span={6}>
          <Input
            value={businessN}
            onChange={(value, context) => {
              handleInputChange(value, 'businessN');

              console.log(value, context, 1111111111);
            }}
            placeholder="请输入业务名称进行搜索"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            所属部门:
          </Button>
        </Col>
        <Col span={6}>
          <Input
            value={selectPart}
            onChange={(value, context) => {
              handleInputChange(value, 'selectPart');
              console.log(value, context);
            }}
            placeholder="请输入所属部门进行搜索"
          />
        </Col>
      </Row>
    ),
    right: (
      <>
        <Button type="primary" onClick={onAdd}>
          新增业务
        </Button>
        <Button type="primary" onClick={handleDelete}>
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
                visible={showModal}
              />
              <TableCommon {...propsConfig} showPic={handleShowPic} selectItems={handleSelectItems}></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default AppPage;

// import TableCommon from '@src/components/tableCommon';
// import { DBTableName } from '@src/services';
// import { Button, Card, Input, Layout, message, Select } from '@tencent/tea-component';
// import React, { useEffect, useState } from 'react';
// import { useIndexedDB } from 'react-indexed-db';
// const { Body, Content } = Layout;

// type RecordType = {
//   id?: number;
//   systemId?: string;
//   systemName?: string;
//   business?: string;
//   businessKinds?: string;
//   systemKinds?: string;
//   addMen?: string;
//   createdAt?: string | number;
//   editMen?: string;
//   editedAt?: string | number;
// };

// const AppPage: React.FC = () => {
//   const [dataList, setDataList] = useState<RecordType[]>();
//   const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.app);

//   const [text, setText] = useState('');
//   const [selectPart, setSelectPart] = useState(null);
//   const [selectBusiness, setSelectBusiness] = useState(null);

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
//       systemId: '系统ID11',
//       systemName: 'systemName111',
//       business: 'business111',
//       businessKinds: 'businessKinds111',
//       systemKinds: 'systemKinds111',
//       addMen: 'addMen111',
//       createdAt: +new Date(),
//       editMen: 'addMen111',
//       editedAt: +new Date(),
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
//   // 新增系统
//   const addSystem = data => {
//     console.log('addSystem');
//     onAdd();
//   };
//   // 新增分区
//   const addArea = data => {
//     console.log('addArea');
//   };
//   const parts = [
//     { value: 's1', text: '所属部门1' },
//     { value: 's2', text: '所属部门2' },
//   ];
//   const businesses = [
//     { value: 's1', text: '所属业务1' },
//     { value: 's2', text: '所属业务2' },
//   ];
//   const propsConfig = {
//     list: dataList,
//     columns: [
//       'systemId',
//       'systemName',
//       'business',
//       'businessKinds',
//       'systemKinds',
//       'addMen',
//       'createdAt',
//       'editMen',
//       'editedAt',
//     ],
//     left: (
//       <>
//         <Input
//           value={text}
//           onChange={(value, context) => {
//             setText(value);
//             console.log(value, context);
//           }}
//           placeholder="请输入系统名称"
//         />
//         <Select
//           style={{ width: '200px', marginLeft: '20px' }}
//           appearance="button"
//           options={parts}
//           value={selectPart}
//           onChange={value => setSelectPart(value)}
//           placeholder="请选择所属部门"
//         />
//         <Select
//           style={{ width: '200px', marginLeft: '20px' }}
//           appearance="button"
//           options={businesses}
//           value={selectBusiness}
//           onChange={value => setSelectBusiness(value)}
//           placeholder="请选择所属业务"
//         />
//       </>
//     ),
//     right: (
//       <>
//         <Button type="primary" onClick={addSystem}>
//           新增系统
//         </Button>
//         <Button type="primary" onClick={addArea}>
//           新增分区
//         </Button>
//       </>
//     ),
//   };
//   return (
//     <Body>
//       <Content>
//         <Content.Header title="应用系统"></Content.Header>
//         <Content.Body>
//           <Card>
//             <Card.Body>
//               <TableCommon {...propsConfig} delete={handleDelete}></TableCommon>
//             </Card.Body>
//           </Card>
//         </Content.Body>
//       </Content>
//     </Body>
//   );
// };

// export default AppPage;
