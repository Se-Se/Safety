import BreadcrumbPage from '@src/components/crumb';
import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Cascader, Col, Input, Layout, message, Row } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import AddModal from './components/addModal';

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
  propertyId?: string;
  propertyName?: string;
  business?: string;
  businessKinds?: string;
  part?: string;
  propertyKind?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
};
const crumb = [
  { name: '银行', link: '/main' },
  { name: '网络资产', link: '/property' },
];
const systemKOptions = [
  { value: 'all', text: '所以类型' },
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];
const PropertyPage: React.FC = () => {
  const [dataList, setDataList] = useState<PropertyType[]>();
  const [allList, setAllList] = useState<PropertyType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.property);

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [checkItem, setCheckItem] = useState([]);
  const [headerSelect, setHeaderSelect] = useState('all');

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
    if (attr === 'inputOne') {
      setInputOne(value);
    }
    if (attr === 'inputTwo') {
      setInputTwo(value);
    }
    if (attr === 'inputThree') {
      setInputThree(value);
    }
  };
  // 筛选数据
  const filterDataList = (arr: any) => {
    if (!arr) {
      return [];
    }
    if (inputOne.trim() === '' && inputTwo.trim() === '' && inputThree.trim() === '' && headerSelect === 'all') {
      return arr;
    }
    let filterArr = [];
    let inputOneArr = filterItem(arr, 'propertyName', inputOne);
    let inputTwoArr = filterItem(arr, 'business', inputTwo);
    let inputThreeArr = filterItem(arr, 'part', inputThree);
    let headerSelectArr = filterItem(arr, 'propertyKind', headerSelect);
    arr.map(item => {
      if (
        inputOneArr.indexOf(item) > -1 &&
        inputTwoArr.indexOf(item) > -1 &&
        inputThreeArr.indexOf(item) > -1 &&
        headerSelectArr.indexOf(item) > -1
      ) {
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
  // 资产类型选择
  const handleSelectChange = (v): void => {
    let str = v.join('/');
    console.log(str);
    setHeaderSelect(str);
  };

  useEffect(() => {
    let arr = filterDataList(allList);
    setDataList([...arr]);
  }, [inputOne, inputTwo, inputThree, headerSelect]);

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
    columns: [
      'propertyId',
      'propertyName',
      'business',
      'businessKinds',
      'part',
      'propertyKind',
      'addMen',
      'createdAt',
      'editMen',
      'editedAt',
    ],
    left: (
      <Row>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            资产名称:
          </Button>
        </Col>
        <Col span={3}>
          <Input
            value={inputOne}
            onChange={(value, context) => {
              handleInputChange(value, 'inputOne');
            }}
            placeholder="请输入资产名称进行搜索"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            所属业务:
          </Button>
        </Col>
        <Col span={3}>
          <Input
            value={inputTwo}
            onChange={(value, context) => {
              handleInputChange(value, 'inputTwo');
            }}
            placeholder="请输入所属业务进行搜索"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            所属部门:
          </Button>
        </Col>
        <Col span={3}>
          <Input
            value={inputThree}
            onChange={(value, context) => {
              handleInputChange(value, 'inputThree');
            }}
            placeholder="请输入所属部门进行搜索"
          />
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button type="text" style={{ margin: '0', cursor: 'text' }}>
            资产类型:
          </Button>
        </Col>
        <Col span={3}>
          <Cascader
            clearable
            type="menu"
            data={propertyOption}
            multiple={false}
            onChange={value => {
              handleSelectChange(value);
            }}
          />
        </Col>
      </Row>
    ),
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
                comName={'property'}
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
