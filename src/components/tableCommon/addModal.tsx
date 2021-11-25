import { DBTableName } from '@src/services';
import { Button, Cascader, Col, Input, message, Modal, Row, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';

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
};
type AppType = {
  id?: number;
  systemId?: string;
  systemName?: string;
  business?: string;
  businessKinds?: string;
  systemKinds?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
};
type FrameType = {
  id?: number;
  areaId?: string;
  areaName?: string;
  systemAndProperty?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
};
const systemOption = [
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName[props.comName]);
  const getUseDb = () => {
    if (props.comName === 'frame') {
      return useIndexedDB(DBTableName.app);
    } else {
      return useIndexedDB(DBTableName.business);
    }
  };
  const { getAll } = getUseDb();
  const [tableData, setTableData] = useState([]);

  const [theName, setTheName] = useState('');
  const [belongSelect, setBelongSelect] = useState('');
  const [belongFieldA, setBelongFieldA] = useState('');
  const [belongFieldB, setBelongFieldB] = useState('');
  const [kindOption, setKindOption] = useState('');
  const [belongOption, setBelongOption] = useState([]);
  const [cascaderProperty, setCascaderProperty] = useState('');

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        getSelecOptions(data);
        setTableData(data);
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
      obj.value = item.systemName;
      obj.text = item.systemName;
      theNameArr.push(obj);
    });

    setBelongOption([...theNameArr]);
    console.log(7777777777777);
  };

  // select change 事件
  const handleSelectChange = (v, attr) => {
    console.log(v);
    if (attr === 'belongSelect') {
      if (v) {
        setBelongSelect(v);
      } else {
        setBelongSelect('');
      }
      if (props.comName === 'frame') {
      } else {
        tableData.map(item => {
          if (item.businessName === v) {
            setBelongFieldA(item.businessKinds);
            setBelongFieldB(item.part);
          }
        });
      }
    }
    if (attr === 'kindOption') {
      setKindOption(v);
    }
  };
  // 资产类型选择
  const handleCascaderChange = (v): void => {
    let str = v.join('/');
    console.log(str);
    setCascaderProperty(str);
  };
  const init = () => {
    setTheName('');
    setBelongSelect('');
    setBelongFieldA('');
    setBelongFieldB('');
    setKindOption('');
    setCascaderProperty('');
  };
  const close = () => {
    props.close();
    init();
  };

  // 检查系统名称是否已存在
  const checkSave = () => {
    if (props.comName === 'frame') {
      if (theName.trim() === '') {
        message.success({ content: '请输入分区名称' });
        return false;
      }
      if (belongSelect.trim() === '') {
        message.success({ content: '请选择包含系统' });
        return false;
      }
      if (props.comName === 'frame' && cascaderProperty.trim() === '') {
        message.success({ content: '包含网络资产' });
        return false;
      }
    } else {
      if (theName.trim() === '') {
        message.success({ content: '请输入资产名称' });
        return false;
      }
      if (belongSelect.trim() === '') {
        message.success({ content: '请选择所属业务' });
        return false;
      }
      if (props.comName === 'property' && cascaderProperty.trim() === '') {
        message.success({ content: '请选择资产类型' });
        return false;
      }
      if (kindOption.trim() === '' && props.comName !== 'property') {
        message.success({ content: '请选择资产类型' });
        return false;
      }
    }

    if (props.allData && !props.isEdit) {
      let arr = [];
      let mess = '';
      let attr = '';
      if (props.comName === 'property') {
        attr = 'propertyName';
        mess = '资产名称已存在';
      } else if (props.comName === 'frame') {
        attr = 'areaName';
        mess = '分区名称已存在';
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
      let request = {};
      if (props.comName === 'property') {
        request = {
          ...props.theData,
          propertyName: theName.trim(),
          business: belongSelect.trim(),
          businessKinds: belongFieldA.trim(),
          part: belongFieldB.trim(),
          propertyKind: cascaderProperty.trim(),
          editMen: 'editMen',
          editedAt: +new Date(),
        };
      } else if (props.comName === 'frame') {
        request = {
          ...props.theData,
          areaName: theName.trim(),
          systemAndProperty: belongSelect.trim() + '/' + cascaderProperty.trim(),
          editMen: 'editMen',
          editedAt: +new Date(),
        };
      }
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
      let request = {};
      if (props.comName === 'property') {
        request = {
          propertyId: 'property_id' + new Date().getTime(),
          propertyName: theName.trim(),
          business: belongSelect.trim(),
          businessKinds: belongFieldA.trim(),
          part: belongFieldB.trim(),
          propertyKind: cascaderProperty.trim(),
          addMen: 'addMen',
          createdAt: +new Date(),
        };
      } else if (props.comName === 'frame') {
        request = {
          areaId: 'area_id' + new Date().getTime(),
          areaName: theName.trim(),
          systemAndProperty: belongSelect.trim() + '/' + cascaderProperty.trim(),
          addMen: 'addMen',
          createdAt: +new Date(),
        };
      }
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
      setTheName(props.theData.systemName);
      setBelongSelect(props.theData.business);
      setBelongFieldA(props.theData.businessKinds);
      setBelongFieldB(props.theData.part);
      if (props.comName === 'property') {
        setCascaderProperty(props.theData.propertyKind);
      } else {
        setKindOption(props.theData.systemKinds);
      }
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
    } else if (props.comName === 'frame') {
      return (
        <>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>分区名称</Col>
            <Col span={12}>
              <Input
                size="full"
                value={theName}
                onChange={(value, context) => {
                  setTheName(value);
                }}
                placeholder="请输入分区名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>包含系统</Col>
            <Col span={12}>
              <Select
                clearable
                matchButtonWidth
                appearance="button"
                placeholder="请选择包含系统"
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
            <Col span={6}>包含网络资产</Col>
            <Col span={12}>
              <Cascader
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
