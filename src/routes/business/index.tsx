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
  { name: '重要业务', link: '/business' },
];
const BusinessPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.business);

  const [text, setText] = useState('');
  const [selectPart, setSelectPart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState(null);

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
    setShowModal(true);
    // add<RecordType>({
    //   businessId: 'businessId123',
    //   businessName: 'businessName123',
    //   part: '11',
    //   businessKinds: 'businessKinds123',
    //   addMen: 'addMen111',
    //   createdAt: +new Date(),
    //   editMen: 'editMen111',
    //   editedAt: +new Date(),
    //   businessPic: '查看',
    // })
    //   .then(() => {
    //     message.success({ content: '成功' });
    //     fetchList();
    //   })
    //   .catch(err => {
    //     message.error({ content: `失败${err}` });
    //   });
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
  const handleShowPic = (data): void => {
    console.log(111, data);
    setModalData(data);
  };
  const handleDataProcess = data => {
    console.log(222, data);
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
            value={text}
            onChange={(value, context) => {
              setText(value);
              console.log(value, context);
            }}
            placeholder="请输入业务名称"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={6}>
          <Select
            style={{ width: '200px', marginLeft: '20px' }}
            appearance="button"
            options={parts}
            value={selectPart}
            onChange={value => setSelectPart(value)}
            placeholder="请选择所属部门"
          />
        </Col>
      </Row>
    ),
    right: (
      <Button type="primary" onClick={onAdd}>
        新增业务
      </Button>
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
              <TableCommon
                {...propsConfig}
                showPic={handleShowPic}
                showDataProcess={handleDataProcess}
                delete={handleDelete}
              ></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default BusinessPage;
