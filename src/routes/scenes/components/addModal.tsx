import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { TextArea } = Input;

type ScenesType = {
  id?: number;
  scenesId?: string;
  sceneName?: string;
  strategy?: string;
  attackObject?: string;
  loseEffect?: string;
  safetyTrade?: string;
};

export default function AddModal(props) {
  const { add, update } = useIndexedDB(DBTableName[props.comName]);

  const [theName, setTheName] = useState('');
  const [theStrategy, setTheStrategy] = useState('');
  const [theAttackObject, setTheAttackObject] = useState('');
  const [theLoseEffect, setTheLoseEffect] = useState('');

  const init = () => {
    setTheName('');
    setTheStrategy('');
    setTheAttackObject('');
    setTheLoseEffect('');
  };
  const close = () => {
    props.close();
    init();
  };

  const handleTextAreaChange = (v, attr) => {
    console.log(v, 111);
    if (attr === 'theStrategy') {
      setTheStrategy(v);
    } else if (attr === 'theAttackObject') {
      setTheAttackObject(v);
    } else if (attr === 'theLoseEffect') {
      setTheLoseEffect(v);
    }
  };
  // 检查系统名称是否已存在
  const checkSave = () => {
    if (theName.trim() === '') {
      message.success({ content: '请输入攻击场景名称' });
      return false;
    }
    if (theStrategy.trim() === '') {
      message.success({ content: '请输入行动策略' });
      return false;
    }
    if (theAttackObject.trim() === '') {
      message.success({ content: '请输入攻击目标' });
      return false;
    }
    if (theLoseEffect.trim() === '') {
      message.success({ content: '请输入损失影响' });
      return false;
    }

    if (props.allData && !props.isEdit) {
      let arr = [];
      let mess = '';
      let attr = '';
      attr = 'sceneName';
      mess = '攻击场景名称已存在';
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
      request = {
        ...props.theData,
        sceneName: theName.trim(),
        strategy: theStrategy.trim(),
        attackObject: theAttackObject.trim(),
        loseEffect: theLoseEffect.trim(),
      };

      update<ScenesType>(request)
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
      request = {
        scenesId: 'scenes_id' + new Date().getTime(),
        sceneName: theName.trim(),
        strategy: theStrategy.trim(),
        attackObject: theAttackObject.trim(),
        loseEffect: theLoseEffect.trim(),
        safetyTrade: props.trade,
      };
      add<ScenesType>(request)
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
      setTheName(props.theData.sceneName);

      setTheStrategy(props.theData.strategy);
      setTheAttackObject(props.theData.attackObject);

      setTheLoseEffect(props.theData.loseEffect);
    }
  }, [props.theData]);
  const templageFn = () => {
    return (
      <>
        <Row>
          <Col span={1}></Col>
          <Col span={6}>攻击场景名称</Col>
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
          <Col span={6}>行动策略</Col>
          <Col span={12}>
            <TextArea
              showCount
              size="full"
              value={theStrategy}
              onChange={value => {
                handleTextAreaChange(value, 'theStrategy');
              }}
              placeholder="输入行动策略"
            />
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={6}>攻击目标</Col>
          <Col span={12}>
            <TextArea
              showCount
              size="full"
              value={theAttackObject}
              onChange={value => {
                handleTextAreaChange(value, 'theAttackObject');
              }}
              placeholder="输入攻击目标"
            />
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={6}>损失影响</Col>
          <Col span={12}>
            <TextArea
              showCount
              size="full"
              value={theLoseEffect}
              onChange={value => {
                handleTextAreaChange(value, 'theLoseEffect');
              }}
              placeholder="输入损失影响"
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
