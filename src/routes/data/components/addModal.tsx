import { DBTableName } from '@src/services';
import { Button, Col, Input, message, Modal, Row, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';

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
type DataType = {
  id?: number;
  dataId?: string;
  dataName?: string;
  systemPart?: string;
  systemKinds?: string;
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
  const { add, update } = useIndexedDB(DBTableName.data);
  const { getAll } = useIndexedDB(DBTableName.app);
  const [tableData, setTableData] = useState<AppType[]>();

  const [theName, setTheName] = useState('');
  const [belongSelect, setBelongSelect] = useState('');
  const [belongField, setBelongField] = useState('');

  const [belongOption, setBelongOption] = useState([]);

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

    const options = [];
    data.map(item => {
      const obj: any = {};
      obj.value = item.systemName;
      obj.text = item.systemName;
      options.push(obj);
    });

    setBelongOption([...options]);
    console.log(7777777777777);
  };

  // select change 事件
  const handleSelectChange = (v, attr) => {
    console.log(v);
    if (attr === 'belongSelect') {
      setBelongSelect(v);
      tableData.map(item => {
        if (item.systemName === v) {
          setBelongField(item.systemKinds);
        }
      });
    }
  };
  const init = () => {
    setTheName('');
    setBelongSelect('');
    setBelongField('');
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
        arr.push(item.dataName);
      });
      if (arr.indexOf(theName.trim()) > -1) {
        message.error({ content: '数据名称已存在' });
        return false;
      }
    }
    return true;
  };
  const handleSave = () => {
    if (theName.trim() === '') {
      message.success({ content: '请输入数据名称' });
      return;
    }
    if (belongSelect.trim() === '') {
      message.success({ content: '请选择所属系统' });
      return;
    }
    if (!checkSave()) {
      return;
    }
    if (props.isEdit) {
      update<DataType>({
        ...props.theData,
        dataName: theName.trim(),
        systemPart: belongSelect.trim(),
        systemKinds: belongField.trim(),
        editMen: 'editMan',
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
      add<DataType>({
        dataId: 'dataId' + new Date().getTime(),
        dataName: theName.trim(),
        systemPart: belongSelect.trim(),
        systemKinds: belongField.trim(),
        addMen: 'addMen',
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
      setTheName(props.theData.dataName);
      setBelongSelect(props.theData.systemName);
      setBelongField(props.theData.systemKinds);
    }
  }, [props.theData]);

  return (
    <>
      <Modal maskClosable visible={props.visible} className="main-modal" disableCloseIcon={true} onClose={close}>
        <Modal.Body>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>数据名称</Col>
            <Col span={12}>
              <Input
                size="full"
                value={theName}
                onChange={(value, context) => {
                  setTheName(value);
                }}
                placeholder="请输入数据名称"
              />
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={6}>所属系统</Col>
            <Col span={12}>
              <Select
                clearable
                matchButtonWidth
                appearance="button"
                placeholder="请选择所属系统"
                options={belongOption}
                onChange={value => {
                  handleSelectChange(value, 'belongSelect');
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
