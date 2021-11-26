import { DBTableName } from '@src/services';
import { Button, Cascader, Col, Input, message, Modal, Row, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { filterTheTrade } from '@src/utils/util';

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
  safetyTrade?: string;
};
type Business = {
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
  safetyTrade?: string;
};

const systemOption = [
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName[props.comName]);
  const { getAll } = useIndexedDB(DBTableName.business);
  const [tableData, setTableData] = useState<Business[]>();

  const [theName, setTheName] = useState('');
  const [belongSelect, setBelongSelect] = useState('');
  const [belongFieldA, setBelongFieldA] = useState('');
  const [belongFieldB, setBelongFieldB] = useState('');
  const [kindOption, setKindOption] = useState('');
  const [belongOption, setBelongOption] = useState([]);
  const [cascaderProperty, setCascaderProperty] = useState([]);

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', props.trade);
        getSelecOptions([...arr]);
        setTableData([...arr]);
      })
      .catch(() => {});
  };
  // 首次打开页面加载
  useEffect(() => {
    if (props.visible) {
      fetchList();
    }
  }, [props.visible]);
  const getSelecOptions = data => {
    if (!data) {
      return;
    }

    const theNameArr = [];
    data.map(item => {
      const obj: any = {};
      obj.value = item.businessName;
      obj.text = item.businessName;
      theNameArr.push(obj);
    });

    setBelongOption([...theNameArr]);
    console.log(7777777777777);
  };

  // select change 事件
  const handleSelectChange = (v, attr) => {
    console.log(v);
    if (attr === 'belongSelect') {
      setBelongSelect(v);
      tableData.map(item => {
        if (item.businessName === v) {
          setBelongFieldA(item.businessKinds);
          setBelongFieldB(item.part);
        }
      });
    }
    if (attr === 'kindOption') {
      setKindOption(v);
    }
  };
  // 资产类型选择
  const handleCascaderChange = (v): void => {
    setCascaderProperty(v);
  };
  const init = () => {
    setTheName('');
    setBelongSelect('');
    setBelongFieldA('');
    setBelongFieldB('');
    setKindOption('');
    setCascaderProperty([]);
  };
  const close = () => {
    props.close();
    init();
  };

  // 检查系统名称是否已存在
  const checkSave = () => {
    if (theName.trim() === '') {
      message.success({ content: '请输入资产名称' });
      return false;
    }
    if (belongSelect.trim() === '') {
      message.success({ content: '请选择所属业务' });
      return false;
    }
    if (props.comName === 'property' && cascaderProperty.join('/').trim() === '') {
      message.success({ content: '请选择资产类型' });
      return false;
    }
    if (kindOption.trim() === '' && props.comName !== 'property') {
      message.success({ content: '请选择资产类型' });
      return false;
    }
    if (props.allData && !props.isEdit) {
      let arr = [];
      let mess = '';
      let attr = '';
      if (props.comName === 'property') {
        attr = 'propertyName';
        mess = '资产名称已存在';
      }
      props.allData.map(item => {
        arr.push(item[attr]);
      });
      if (arr.indexOf(theName.trim()) > -1) {
        message.error({ content: mess });
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!checkSave()) {
      return;
    }
    if (props.isEdit) {
      let request = {
        ...props.theData,
        propertyName: theName.trim(),
        business: belongSelect.trim(),
        businessKinds: belongFieldA.trim(),
        part: belongFieldB.trim(),
        propertyKind: cascaderProperty.join('/').trim(),
        editMen: 'shanehwang',
        editedAt: +new Date(),
      };

      update<PropertyType>(request)
        .then(() => {
          message.success({ content: '成功' });
          props.close();
          props.save();
          init();
        })
        .catch(err => {
          message.error({ content: `失败${err}` });
        });
    } else {
      let request = {
        propertyId: 'property_id' + new Date().getTime(),
        propertyName: theName.trim(),
        business: belongSelect.trim(),
        businessKinds: belongFieldA.trim(),
        part: belongFieldB.trim(),
        propertyKind: cascaderProperty.join('/').trim(),
        addMen: 'shanehwang',
        createdAt: +new Date(),
        safetyTrade: props.trade,
      };

      add<PropertyType>(request)
        .then(() => {
          message.success({ content: '成功' });
          props.close();
          props.save();
          init();
        })
        .catch(err => {
          message.error({ content: `失败${err}` });
        });
    }
  };
  useEffect(() => {
    if (props.theData && props.isEdit) {
      setTheName(props.theData.propertyName);
      setBelongSelect(props.theData.business);
      setBelongFieldA(props.theData.businessKinds);
      setBelongFieldB(props.theData.part);
      setCascaderProperty(props.theData.propertyKind.split('/'));
    }
  }, [props.theData]);
  const templageFn = () => {
    if (props.comName === 'property') {
      return (
        <>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>资产名称</Col>
            <Col span={12}>
              <Input
                size="full"
                value={theName}
                onChange={(value, context) => {
                  setTheName(value);
                }}
                placeholder="请输入资产名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>所属业务</Col>
            <Col span={12}>
              <Select
                value={belongSelect}
                clearable
                matchButtonWidth
                appearance="button"
                placeholder="请选择所属业务"
                options={belongOption}
                onChange={value => {
                  handleSelectChange(value, 'belongSelect');
                }}
                size="full"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>资产类型</Col>
            <Col span={12}>
              <Cascader
                style={{ width: '100%' }}
                value={cascaderProperty}
                clearable
                type="menu"
                data={props.propertyOption}
                multiple={false}
                onChange={value => {
                  handleCascaderChange(value);
                }}
              />
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <>
      <Modal maskClosable visible={props.visible} className="main-modal" disableCloseIcon={true} onClose={close}>
        <Modal.Body>{templageFn()}</Modal.Body>
        <Modal.Footer>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button type="weak" onClick={close}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
