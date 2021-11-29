import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row, Text } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';

type RecordType = {
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
        message.warning({ content: '业务名称已存在' });
        return false;
      }
    }
    return true;
  };
  const handleSave = () => {
    if (businessN.trim() === '') {
      message.warning({ content: '请输入业务名称' });
      return;
    }
    if (thePart.trim() === '') {
      message.warning({ content: '请输入所属部门' });
      return;
    }
    if (businessK.trim() === '') {
      message.warning({ content: '请输入业务大类' });
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
        editMen: 'shanehwang',
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
        addMen: 'shanehwang',
        createdAt: +new Date(),
        safetyTrade: props.trade,
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
      <Modal maskClosable visible={props.visible} size="m" disableCloseIcon={true} onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">业务名称 </Text>
            </Col>
            <Col span={12}>
              <Input
                size="full"
                value={businessN}
                onChange={value => {
                  setBusinessN(value);
                }}
                placeholder="请输入业务名称"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">所属部门 </Text>
            </Col>
            <Col span={12}>
              <Input
                size="full"
                value={thePart}
                onChange={value => {
                  setThePart(value);
                }}
                placeholder="请输入所属部门"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">业务大类 </Text>
            </Col>
            <Col span={12}>
              <Input
                size="full"
                value={businessK}
                onChange={value => {
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
