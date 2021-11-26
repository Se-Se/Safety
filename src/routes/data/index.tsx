import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Input, Layout, message, Select, Row, Col } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import BreadcrumbPage from '@src/components/crumb';
import AddModal from './components/addModal';
import { filterTheTrade } from '@src/utils/util';
import cookie from 'react-cookies';

const { Body, Content } = Layout;

type DataType = {
  id?: number;
  dataId?: string;
  dataName?: string;
  systemPart?: string;
  systemKinds?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
  safetyTrade?: string;
};
const crumb = [
  { name: '银行', link: '/main' },
  { name: '数据业务', link: '/data' },
];
const systemKOptions = [
  { value: 'all', text: '所以类型' },
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];
const DataPage: React.FC = () => {
  const [dataList, setDataList] = useState<DataType[]>();
  const [allList, setAllList] = useState<DataType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.data);
  const val = cookie.load('safetyTrade');
  const [trade, setTrade] = useState(val);

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [checkItem, setCheckItem] = useState([]);

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        console.log(data, 123);
        const arr = filterTheTrade(data, 'safetyTrade', trade);
        console.log(arr, 55555555);
        setDataList([...arr]);
        setAllList([...arr]);
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
    if (attr === 'inputOne') {
      setInputOne(value);
    }
    if (attr === 'inputTwo') {
      setInputTwo(value);
    }
  };
  // 筛选数据
  const filterDataList = (arr: any) => {
    if (!arr) {
      return [];
    }
    if (inputOne.trim() === '' && inputTwo.trim() === '') {
      return arr;
    }
    let filterArr = [];
    let inputOneArr = filterItem(arr, 'dataName', inputOne);
    let inputTwoArr = filterItem(arr, 'systemPart', inputTwo);

    arr.map(item => {
      if (inputOneArr.indexOf(item) > -1 && inputTwoArr.indexOf(item) > -1) {
        filterArr.push(item);
      }
    });
    return filterArr;
  };
  const filterItem = (arr, attr, value) => {
    if (!arr) {
      return [];
    }
    let newArr = [];
    if (value.trim() === '' || value.trim() === 'all') {
      newArr = [...arr];
    } else {
      arr.map(item => {
        if (item[attr] === value) {
          newArr.push(item);
        }
      });
    }
    return newArr;
  };

  useEffect(() => {
    let arr = filterDataList(allList);
    setDataList([...arr]);
  }, [inputOne, inputTwo]);

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
  const handleShowPic = (data): void => {
    console.log(111, data);
    setModalData(data);
  };

  const propsConfig = {
    list: dataList,
    columns: ['dataId', 'dataName', 'systemPart', 'systemKinds', 'addMen', 'createdAt', 'editMen', 'editedAt'],
    left: (
      <Row>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            名称:
          </Button>
        </Col>
        <Col span={4}>
          <Input
            value={inputOne}
            onChange={(value, context) => {
              handleInputChange(value, 'inputOne');

              console.log(value, context, 1111111111);
            }}
            placeholder="请输入数据名称进行搜索"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            所属系统:
          </Button>
        </Col>
        <Col span={4}>
          <Input
            value={inputTwo}
            onChange={(value, context) => {
              handleInputChange(value, 'inputTwo');
              console.log(value, context);
            }}
            placeholder="请输入所属系统进行搜索"
          />
        </Col>
      </Row>
    ),
    right: (
      <>
        <Button type="primary" onClick={onAdd}>
          新增数据
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
                trade={trade}
              />
              <TableCommon
                {...propsConfig}
                systemKOptions={systemKOptions}
                showPic={handleShowPic}
                selectItems={handleSelectItems}
              ></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default DataPage;
