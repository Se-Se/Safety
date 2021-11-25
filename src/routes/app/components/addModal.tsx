import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Input, message, Select } from '@tencent/tea-component';
import { useIndexedDB } from 'react-indexed-db';
import { DBTableName } from '@src/services';

type RecordType = {
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

const systemOption = [
  { value: 'otherSys', text: '第三方系统' },
  { value: 'ownSys', text: '内部系统' },
];

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName.app);
  const { getAll } = useIndexedDB(DBTableName.business);
  const [businessData, setBusinessData] = useState<Business[]>();

  const [systemN, setSystemN] = useState('');
  const [theBusiness, setTheBusiness] = useState('');
  const [businessK, setBusinessK] = useState('');
  const [systemK, setSystemK] = useState('');
  const [businessNameArr, setBusinessNameArr] = useState([]);

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        getSelecOptions(data);
        setBusinessData(data);
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
  };
  const close = () => {
    console.log(1111111);
    props.close();
    init();
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
    if (props.isEdit) {
      update<RecordType>({
        ...props.theData,
        systemName: systemN.trim(),
        business: theBusiness.trim(),
        businessKinds: businessK.trim(),
        systemKinds: systemK.trim(),
        editedAt: +new Date(),
      })
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
      add<RecordType>({
        systemId: 'id' + new Date(),
        systemName: systemN.trim(),
        business: theBusiness.trim(),
        businessKinds: businessK.trim(),
        systemKinds: systemK.trim(),
        createdAt: +new Date(),
      })
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
      setSystemN(props.theData.systemName);
      setTheBusiness(props.theData.business);
      setBusinessK(props.theData.businessKinds);
      setSystemK(props.theData.systemKinds);
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
