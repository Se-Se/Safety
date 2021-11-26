import BreadcrumbPage from '@src/components/crumb';
import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { Button, Card, Col, Input, Layout, message, Select, SearchBox } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import AddModal from './components/addModal';
import { filterTheTrade } from '@src/utils/util';
import cookie from 'react-cookies';

const { Body, Content } = Layout;

type GapType = {
  id?: number;
  gapId?: string;
  propertyOrSystem?: string;
  business?: string;
  businessKinds?: string;
  part?: string;
  categorys?: string;
  theType?: string;
  editMen?: string;
  editedAt?: string | number;
  actType?: string;
  theBug?: string;
  safetyTrade?: string;
};
const crumb = [
  { name: '银行', link: '/main' },
  { name: '攻击手法与漏洞', link: '/gap' },
];
const systemOrPropertyOption = [
  { value: 'all', text: '所以类型' },
  { value: 'system', text: '系统' },
  { value: 'property', text: '资产' },
];
const GapPage: React.FC = () => {
  const [dataList, setDataList] = useState<GapType[]>();
  const [allList, setAllList] = useState<GapType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.gap);
  const val = cookie.load('safetyTrade');
  const [trade, setTrade] = useState(val);

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [headerSelect, setHeaderSelect] = useState('all');

  const [appData, setAppData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  // 拉取应用系统数据
  const getAppData = () => {
    const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.app);
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', trade);
        setAppData([...arr]);
      })
      .catch(() => {});
  };
  // 拉取网络资产数据
  const getPropertyData = () => {
    const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.property);
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', trade);
        setPropertyData([...arr]);
      })
      .catch(() => {});
  };

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', trade);
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

  const handleEdit = data => {
    console.log(data, 123321);
    setModalData({ ...data });
    setIsEdit(true);
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
    if (inputOne.trim() === '' && inputTwo.trim() === '' && headerSelect === 'all') {
      return arr;
    }
    let filterArr = [];
    let inputOneArr = filterItem(arr, 'systemName', inputOne);
    let inputTwoArr = filterItem(arr, 'business', inputTwo);
    let headerSelectArr = filterItem(arr, 'systemKinds', headerSelect);
    arr.map(item => {
      if (inputOneArr.indexOf(item) > -1 && inputTwoArr.indexOf(item) > -1 && headerSelectArr.indexOf(item) > -1) {
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
  // 系统类型选择
  const handleSelectChange = (v): void => {
    setHeaderSelect(v);
  };

  useEffect(() => {
    let arr = filterDataList(allList);
    setDataList([...arr]);
  }, [inputOne, inputTwo, headerSelect]);

  const propsConfig = {
    list: dataList,
    notSelectable: true,
    columns: [
      'gapId',
      'propertyAndSystem',
      'business',
      'businessKinds',
      'part',
      'categorys',
      'theType',
      'editMen',
      'editedAt',
      'actType',
      'theBug',
      'action',
    ],
    right: (
      <>
        <SearchBox
          value={inputOne}
          className="margin-r-30"
          onChange={(value, context) => {
            handleInputChange(value, 'inputOne');

            console.log(value, context, 1111111111);
          }}
          placeholder="请输入系统/资产名称"
        />

        <SearchBox
          value={inputTwo}
          className="margin-r-30"
          onChange={(value, context) => {
            handleInputChange(value, 'inputTwo');
            console.log(value, context);
          }}
          placeholder="请输入所属部门"
        />

        <Select
          size="m"
          clearable
          matchButtonWidth
          appearance="button"
          value={headerSelect}
          placeholder="分类"
          onChange={v => {
            handleSelectChange(v);
          }}
          options={systemOrPropertyOption}
        />
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
              <TableCommon {...propsConfig} onEdit={handleEdit}></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default GapPage;
