import { DBTableName } from '@src/services';
import { Button, Cascader, Col, Input, message, Modal, Row, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { filterTheTrade } from '@src/utils/util';

type FrameType = {
  id?: number;
  areaId?: string;
  areaName?: string;
  belongSystem?: string;
  belongProperty?: string;
  systemAndProperty?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
  safetyTrade?: string;
};

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName.frame);
  const getUseDb = () => {
    return useIndexedDB(DBTableName.app);
  };
  const { getAll } = getUseDb();

  const [theName, setTheName] = useState('');
  const [belongSelect, setBelongSelect] = useState('');
  const [belongOption, setBelongOption] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [propertyNameOption, setPropertyNameOption] = useState([]);

  // 获取所有网络资产数据
  const getPropertys = () => {
    const { getAll } = useIndexedDB(DBTableName.property);
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', props.trade);
        getSelecOptions([...arr], 'propertyNameOption');
      })
      .catch(() => {});
  };
  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', props.trade);
        getSelecOptions([...arr], 'belongOption');
      })
      .catch(() => {});
    getPropertys();
  };
  // 首次打开页面加载
  useEffect(() => {
    if (props.visible) {
      fetchList();
    }
  }, [props.visible]);
  const getSelecOptions = (data, attr) => {
    if (!data) {
      return;
    }

    const theNameArr = [];
    data.map(item => {
      const obj: any = {};
      if (attr === 'propertyNameOption') {
        obj.value = item.propertyName;
        obj.text = item.propertyName;
      } else {
        obj.value = item.systemName;
        obj.text = item.systemName;
      }

      theNameArr.push(obj);
    });
    if (attr === 'propertyNameOption') {
      setPropertyNameOption([...theNameArr]);
    } else {
      setBelongOption([...theNameArr]);
    }
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
    }
    if (attr === 'propertyName') {
      if (v) {
        setPropertyName(v);
      } else {
        setPropertyName('');
      }
    }
  };
  // 资产类型选择

  const init = () => {
    setTheName('');
    setBelongSelect('');
    setPropertyName('');
  };
  const close = () => {
    props.close();
    init();
  };

  // 检查系统名称是否已存在
  const checkSave = () => {
    if (theName.trim() === '') {
      message.success({ content: '请输入分区名称' });
      return false;
    }
    if (belongSelect.trim() === '') {
      message.success({ content: '请选择包含系统' });
      return false;
    }
    if (props.comName === 'frame' && propertyName.trim() === '') {
      message.success({ content: '包含网络资产' });
      return false;
    }

    if (props.allData && !props.isEdit) {
      let arr = [];
      let mess = '';
      let attr = '';
      attr = 'areaName';
      mess = '分区名称已存在';
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
        areaName: theName.trim(),
        belongSystem: belongSelect.trim(),
        belongProperty: propertyName.trim(),
        systemAndProperty: belongSelect.trim() + '/' + propertyName.trim(),
        editMen: 'shanehwang',
        editedAt: +new Date(),
      };

      update<FrameType>(request)
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
        areaId: 'area_id' + new Date().getTime(),
        areaName: theName.trim(),
        belongSystem: belongSelect.trim(),
        belongProperty: propertyName.trim(),
        systemAndProperty: belongSelect.trim() + '/' + propertyName.trim(),
        addMen: 'shanehwang',
        createdAt: +new Date(),
        safetyTrade: props.trade,
      };

      add<FrameType>(request)
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
      setTheName(props.theData.areaName);
      setBelongSelect(props.theData.belongSystem);
      setPropertyName(props.theData.belongProperty);
    }
  }, [props.theData]);
  const templageFn = () => {
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
              value={belongSelect}
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
            <Select
              value={propertyName}
              clearable
              matchButtonWidth
              appearance="button"
              placeholder="请选择网络资产"
              options={propertyNameOption}
              onChange={value => {
                handleSelectChange(value, 'propertyName');
              }}
              size="full"
            />
          </Col>
        </Row>
      </>
    );
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
