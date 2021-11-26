import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { filterTheTrade } from '@src/utils/util';
const { TextArea } = Input;

type GapType = {
  id?: number;
  gapId?: string;
  propertyAndSystem?: string;
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
  const { add, update } = useIndexedDB(DBTableName.gap);
  const { getAll } = useIndexedDB(DBTableName.business);
  const [businessData, setBusinessData] = useState<Business[]>();

  const [theName, setTheName] = useState('');
  const [theActType, setTheActType] = useState('');
  const [theTheBug, setTheTheBug] = useState('');
  const [businessNameArr, setBusinessNameArr] = useState([]);

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        const arr = filterTheTrade(data, 'safetyTrade', props.trade);
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

  const init = () => {
    setTheName('');
    setTheActType('');
    setTheTheBug('');
  };
  const close = () => {
    console.log(1111111);
    props.close();
    init();
  };

  const handleTextAreaChange = (v, attr) => {
    console.log(v, 111);
    if (attr === 'theActType') {
      setTheActType(v);
    } else if (attr === 'theTheBug') {
      setTheTheBug(v);
    }
  };

  const handleSave = () => {
    if (theActType.trim() === '') {
      message.success({ content: '请输入攻击手法' });
      return;
    }
    if (theTheBug.trim() === '') {
      message.success({ content: '请输入漏洞' });
      return;
    }

    if (props.isEdit) {
      update<GapType>({
        ...props.theData,
        propertyAndSystem: theName.trim(),
        business: 'theBusiness',
        businessKinds: 'businessKinds',
        part: 'part',
        categorys: 'categorys',
        theType: 'theType',
        editMen: '王翰',
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
    } else {
      add<GapType>({
        gapId: 'gap_id' + new Date().getTime(),
        propertyAndSystem: theName.trim(),
        business: 'theBusiness',
        businessKinds: 'businessKinds',
        part: 'part',
        categorys: 'categorys',
        theType: 'theType',
        editMen: '王翰',
        editedAt: +new Date(),
        actType: theActType.trim(),
        theBug: theTheBug.trim(),
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
      setTheActType(props.theData.actType);
      setTheTheBug(props.theData.theBug);
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
                value={theName}
                onChange={(value, context) => {
                  setTheName(value);
                }}
                placeholder="请输入系统名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>攻击手法</Col>
            <Col span={12}>
              <TextArea
                showCount
                size="full"
                value={theActType}
                onChange={value => {
                  handleTextAreaChange(value, 'theActType');
                }}
                placeholder="输入攻击手法"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>漏洞</Col>
            <Col span={12}>
              <TextArea
                showCount
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
