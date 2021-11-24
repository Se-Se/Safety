import TableCommon from '@src/components/tableCommon';
import { DBTableName } from '@src/services';
import { useHistory } from '@tea/app';
import { Button, Card, Input, Layout, message, Select } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  systemConId?: string;
  configurationName?: string;
  relationArea?: string;
  relationSystem?: string;
  configurationPic?: string;
  addMen?: string;
  createdAt?: string | number;
};

const FramePage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.frame);

  const [text, setText] = useState('');
  const [selectSys, setSelectSys] = useState(null);
  const [selectArea, setSelectArea] = useState(null);

  const history = useHistory();

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        console.log(data, 123);
        setDataList(data);
      })
      .catch(() => {});
  };

  // 首次打开页面加载 第二个参数需要是空数组保证只加载一次
  useEffect(() => {
    fetchList();
  }, []);

  // 点击添加按钮
  const onAdd = () => {
    add<RecordType>({
      systemConId: 'systemConId11',
      configurationName: '11',
      relationArea: 'relationArea11',
      relationSystem: 'relationSystem1110000000',
      configurationPic: '查看',
      addMen: 'addMen111',
      createdAt: +new Date(),
    })
      .then(() => {
        message.success({ content: '成功' });
        fetchList();
      })
      .catch(err => {
        message.error({ content: `失败${err}` });
      });
  };

  const handleDelete = (data: any): void => {
    console.log(333, data);
    deleteRecord(data.id)
      .then(() => {
        message.success({ content: '成功' });
        fetchList();
      })
      .catch(err => {
        message.error({ content: `失败${err}` });
      });
  };
  const handleShowConfiguration = data => {
    console.log(111, data);
    history.push('/configuration');
  };

  const systems = [
    { value: 's1', text: '系统1' },
    { value: 's2', text: '系统2' },
  ];
  const areas = [
    { value: 's1', text: '相关分区1' },
    { value: 's2', text: '相关分区2' },
  ];
  const propsConfig = {
    list: dataList,
    columns: [
      'systemConId',
      'configurationName',
      'relationArea',
      'relationSystem',
      'configurationPic',
      'addMen',
      'createdAt',
      'action',
    ],
    left: (
      <>
        <Input
          value={text}
          onChange={(value, context) => {
            setText(value);
            console.log(value, context);
          }}
          placeholder="请输入架构名称"
        />
        <Select
          style={{ width: '200px', marginLeft: '20px' }}
          appearance="button"
          options={areas}
          value={selectArea}
          onChange={value => setSelectArea(value)}
          placeholder="请选择关联分区"
        />
        <Select
          style={{ width: '200px', marginLeft: '20px' }}
          appearance="button"
          options={systems}
          value={selectSys}
          onChange={value => setSelectSys(value)}
          placeholder="请选择关联系统"
        />
      </>
    ),
    right: (
      <Button type="primary" onClick={onAdd}>
        新增数据
      </Button>
    ),
  };
  return (
    <Body>
      <Content>
        <Content.Header title="系统架构"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <TableCommon
                {...propsConfig}
                showConfiguration={handleShowConfiguration}
                delete={handleDelete}
              ></TableCommon>
            </Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default FramePage;
