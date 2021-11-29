import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { filterTheTrade } from '@src/utils/util';

type RecordType = {
  systemId?: string;
  systemName?: string;
  business?: string;
  businessKinds?: string;
  systemKinds?: string;
  addMen?: string;
  createdAt?: string | number;
  editMen?: string;
  editedAt?: string | number;
  safetyTrade?: string;
  theBusinessId?: string;
};
type Business = {
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
type GapType = {
  gapId?: string;
  propertyOrSystem?: string;
  business?: string;
  businessKinds?: string;
  part?: string;
  categorys?: string;
  theType?: string;
  addMen?: string;
  editedAt?: string | number;
  actType?: string;
  theBug?: string;
  safetyTrade?: string;
  theBusinessId?: string;
};

const systemOption = [
  { value: '第三方系统', text: '第三方系统' },
  { value: '内部系统', text: '内部系统' },
];

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName.app);
  const { getAll } = useIndexedDB(DBTableName.business);
  const [businessData, setBusinessData] = useState<Business[]>();

  const [systemN, setSystemN] = useState('');
  const [theBusiness, setTheBusiness] = useState('');
  const [businessK, setBusinessK] = useState('');
  const [thePart, setThePart] = useState('');
  const [theBusinessId, setTheBusinessId] = useState('');
  const [systemK, setSystemK] = useState('');
  const [businessNameArr, setBusinessNameArr] = useState([]);

  // 修改gap表数据
  const handleGapTable = (type, data) => {
    const { add, update } = useIndexedDB(DBTableName.gap);
    let request: GapType = {
      gapId: data.systemId,
      propertyOrSystem: data.systemName,
      business: data.business,
      businessKinds: data.businessKinds,
      part: data.part,
      categorys: 'system',
      theType: data.systemKinds,
      addMen: data.addMen,
      editedAt: data.createdAt,
      actType: '',
      theBug: '',
      safetyTrade: data.safetyTrade,
      theBusinessId: data.theBusinessId,
    };
    if (type === 'add') {
      add<GapType>(request)
        .then(() => {
          message.success({ content: '成功' });
        })
        .catch(err => {
          message.error({ content: `失败${err}` });
        });
    } else if (type === 'update') {
      request.editedAt = data.editedAt;
      update<GapType>(request)
        .then(() => {
          message.success({ content: '成功' });
        })
        .catch(err => {
          message.error({ content: `失败${err}` });
        });
    }
  };
  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', props.trade);
        getSelecOptions([...arr]);
        setBusinessData([...arr]);
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

    setBusinessNameArr([...theNameArr]);
    console.log(7777777777777);
  };
  // select change 事件
  const handleSelectChange = (v, attr) => {
    console.log(v);
    if (attr === 'theBusiness') {
      setTheBusiness(v);
      businessData.map(item => {
        if (item.businessName === v) {
          setBusinessK(item.businessKinds);
          setThePart(item.part);
          setTheBusinessId(item.businessId);
        }
      });
    }
    if (attr === 'systemK') {
      setSystemK(v);
    }
  };
  const init = () => {
    setSystemN('');
    setTheBusiness('');
    setBusinessK('');
    setSystemK('');
    setThePart('');
    setTheBusinessId('');
  };
  const close = () => {
    console.log(1111111);
    props.close();
    init();
  };

  // 检查系统名称是否已存在
  const checkSave = () => {
    if (props.allData && !props.isEdit) {
      let arr = [];
      props.allData.map(item => {
        arr.push(item.systemName);
      });
      if (arr.indexOf(systemN.trim()) > -1) {
        message.error({ content: '系统名称已存在' });
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (systemN.trim() === '') {
      message.success({ content: '请输入业务名称' });
      return;
    }
    if (theBusiness.trim() === '') {
      message.success({ content: '请选择所属部门' });
      return;
    }
    if (systemK.trim() === '') {
      message.success({ content: '请选择系统类型' });
      return;
    }
    if (!checkSave()) {
      return;
    }
    if (props.isEdit) {
      let request = {
        ...props.theData,
        systemName: systemN.trim(),
        business: theBusiness.trim(),
        businessKinds: businessK.trim(),
        systemKinds: systemK.trim(),
        editMen: 'shanehwang',
        editedAt: +new Date(),
        theBusinessId: theBusinessId,
      };
      update<RecordType>(request)
        .then(() => {
          handleGapTable('update', request);
          props.close();
          props.save();
          init();
        })
        .catch(err => {
          message.error({ content: `失败${err}` });
        });
    } else {
      let request = {
        systemId: 'app_id' + new Date().getTime(),
        systemName: systemN.trim(),
        business: theBusiness.trim(),
        businessKinds: businessK.trim(),
        part: thePart.trim(),
        systemKinds: systemK.trim(),
        addMen: 'shanehwang',
        createdAt: +new Date(),
        safetyTrade: props.trade,
        theBusinessId: theBusinessId,
      };
      add<RecordType>(request)
        .then(() => {
          handleGapTable('add', request);
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
      setSystemN(props.theData.systemName);
      setTheBusiness(props.theData.business);
      setBusinessK(props.theData.businessKinds);
      setSystemK(props.theData.systemKinds);
      setThePart(props.theData.part);
      setTheBusinessId(props.theData.theBusinessId);
    }
  }, [props.theData]);

  return (
    <>
      <Modal maskClosable visible={props.visible} className="main-modal" disableCloseIcon={true} onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>系统名称</Col>
            <Col span={12}>
              <Input
                size="full"
                value={systemN}
                onChange={(value, context) => {
                  setSystemN(value);
                }}
                placeholder="请输入系统名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>所属业务</Col>
            <Col span={12}>
              <Select
                value={theBusiness}
                clearable
                matchButtonWidth
                appearance="button"
                placeholder="请选择所属业务"
                options={businessNameArr}
                onChange={value => {
                  handleSelectChange(value, 'theBusiness');
                }}
                size="full"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>系统类型</Col>
            <Col span={12}>
              <Select
                value={systemK}
                clearable
                matchButtonWidth
                appearance="button"
                placeholder="请选择系统类型"
                options={systemOption}
                onChange={value => {
                  handleSelectChange(value, 'systemK');
                }}
                size="full"
              />
            </Col>
          </Row>
        </Modal.Body>
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
