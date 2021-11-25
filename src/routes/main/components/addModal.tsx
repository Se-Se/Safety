import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Input, TextArea, message } from '@tencent/tea-component';
import { useIndexedDB } from 'react-indexed-db';
import { DBTableName } from '@src/services';

type RecordType = {
  id?: number;
  tradeN?: string;
  description?: string;
  createdAt?: string | number;
};
export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName.trade);
  const [title, setTitle] = useState('');
  const [desText, setDesText] = useState('');

  const handleTitle = (t: string) => {
    setTitle(t);
  };
  const handleDesText = (t: string) => {
    setDesText(t);
  };
  const init = () => {
    setDesText('');
    setTitle('');
  };
  const close = () => {
    console.log(1111111);
    props.close();
    init();
  };
  const handleSave = () => {
    if (title.trim() === '') {
      message.success({ content: '请输入标题' });
      return;
    }
    if (desText.trim() === '') {
      message.success({ content: '请输入描述' });
      return;
    }
    if (props.isEdit) {
      update<RecordType>({ tradeN: title, description: desText, id: props.theTrade.id, createdAt: +new Date() })
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
        tradeN: title,
        description: desText,
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
    if (props.theTrade) {
      setDesText(props.theTrade.description);
      setTitle(props.theTrade.tradeN);
    }
  }, [props.theTrade]);

  return (
    <>
      <Modal maskClosable visible={props.visible} className="main-modal" onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>标题</Col>
            <Col span={12}>
              <Input
                size="full"
                value={title}
                onChange={(value, context) => {
                  handleTitle(value);
                }}
                placeholder="请输入标题"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>描述</Col>
            <Col span={12}>
              <TextArea
                size="full"
                value={desText}
                onChange={value => {
                  handleDesText(value);
                }}
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
