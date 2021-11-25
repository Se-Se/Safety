import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Input, message } from '@tencent/tea-component';
import { useIndexedDB } from 'react-indexed-db';
import { DBTableName } from '@src/services';

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
export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName.business);

  const [businessN, setBusinessN] = useState('');
  const [thePart, setThePart] = useState('');
  const [businessK, setBusinessK] = useState('');

  const init = () => {
    setBusinessN('');
    setThePart('');
    setBusinessK('');
  };
  const close = () => {
    console.log(1111111);
    props.close();
    init();
  };
  const checkSave = () => {
    if (props.allData && !props.isEdit) {
      let arr = [];
      props.allData.map(item => {
        arr.push(item.businessName);
      });
      if (arr.indexOf(businessN.trim()) > -1) {
        message.error({ content: '业务名称已存在' });
        return false;
      }
    }
    return true;
  };
  const handleSave = () => {
    if (businessN.trim() === '') {
      message.success({ content: '请输入业务名称' });
      return;
    }
    if (thePart.trim() === '') {
      message.success({ content: '请输入所属部门' });
      return;
    }
    if (businessK.trim() === '') {
      message.success({ content: '请输入业务大类' });
      return;
    }
    if (!checkSave()) {
      return;
    }
    if (props.isEdit) {
      update<RecordType>({
        ...props.theData,
        businessName: businessN.trim(),
        part: thePart.trim(),
        businessKinds: businessK.trim(),
        editMen: 'editMen',
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
        businessId: 'business_id' + new Date().getTime(),
        businessName: businessN.trim(),
        part: thePart.trim(),
        businessKinds: businessK.trim(),
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
      setBusinessN(props.theData.businessName);
      setThePart(props.theData.part);
      setBusinessK(props.theData.businessKinds);
    }
  }, [props.theData]);

  return (
    <>
      <Modal maskClosable visible={props.visible} className="main-modal" disableCloseIcon={true} onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>业务名称</Col>
            <Col span={12}>
              <Input
                size="full"
                value={businessN}
                onChange={(value, context) => {
                  setBusinessN(value);
                }}
                placeholder="请输入业务名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>所属部门</Col>
            <Col span={12}>
              <Input
                size="full"
                value={thePart}
                onChange={(value, context) => {
                  setThePart(value);
                }}
                placeholder="请输入所属部门"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>业务大类</Col>
            <Col span={12}>
              <Input
                size="full"
                value={businessK}
                onChange={(value, context) => {
                  setBusinessK(value);
                }}
                placeholder="请输入业务大类"
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
