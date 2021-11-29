import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row, Text } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { TextArea } = Input;

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

export default function AddModal(props) {
  const { update } = useIndexedDB(DBTableName.gap);
  const [theName, setTheName] = useState('');
  const [theActType, setTheActType] = useState('');
  const [theTheBug, setTheTheBug] = useState('');

  const init = () => {
    setTheName('');
    setTheActType('');
    setTheTheBug('');
  };
  const close = () => {
    props.close();
    init();
  };

  const handleTextAreaChange = (v, attr) => {
    if (attr === 'theActType') {
      setTheActType(v);
    } else if (attr === 'theTheBug') {
      setTheTheBug(v);
    }
  };

  const handleSave = () => {
    if (theActType.trim() === '') {
      message.warning({ content: '请输入攻击手法' });
      return;
    }
    if (theTheBug.trim() === '') {
      message.warning({ content: '请输入漏洞' });
      return;
    }

    if (props.isEdit) {
      update<GapType>({
        ...props.theData,
        editMen: 'shanehwang',
        editedAt: +new Date(),
        actType: theActType.trim(),
        theBug: theTheBug.trim(),
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
      setTheName(props.theData.propertyOrSystem);
      setTheActType(props.theData.actType);
      setTheTheBug(props.theData.theBug);
    }
  }, [props.theData]);

  return (
    <>
      <Modal maskClosable visible={props.visible} size="l" disableCloseIcon={true} onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">资产/系统名称：</Text>
            </Col>
            <Col span={12}>
              <Input
                readOnly
                size="full"
                value={theName}
                onChange={value => {
                  setTheName(value);
                }}
                placeholder="系统/资产名称"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">攻击手法 </Text>
            </Col>
            <Col span={12}>
              <TextArea
                size="full"
                value={theActType}
                onChange={value => {
                  handleTextAreaChange(value, 'theActType');
                }}
                placeholder="输入攻击手法"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={3}></Col>
            <Col span={4}>
              <Text theme="label">漏洞 </Text>
            </Col>
            <Col span={12}>
              <TextArea
                size="full"
                value={theTheBug}
                onChange={value => {
                  handleTextAreaChange(value, 'theTheBug');
                }}
                placeholder="输入漏洞"
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
