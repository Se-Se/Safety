import { DBTableName } from '@src/services';
import { Button, Card, Layout, message, useClassNames, Row, Col, Select, Input } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import EditorBraft from './components/braft';
const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  recommendName?: string;
  category_1?: string;
  category_2?: string;
  describe?: string;
  createdAt?: string | number;
};

const zoneOptions = [
  { value: '分区1', text: '分区1' },
  { value: '分区2', text: '分区2' },
  { value: '分区3', text: '分区3' },
];
const levelOptions = [
  { value: '低风险', text: '低风险' },
  { value: '中风险', text: '中风险' },
  { value: '高风险', text: '高风险' },
];

const AddRecommendPage: React.FC = () => {
  const [dataList, setDataList] = useState<RecordType[]>();
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.recommend);

  const [zone, setZone] = useState('');
  const [kind, setKind] = useState('');
  const [dangerLevel, setDangerLevel] = useState('');

  const { Padding } = useClassNames();
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

  const handleZoneSelect = v => {
    console.log(v);
    setZone(v);
  };
  const handleLevelSelect = v => {
    console.log(v);
    setDangerLevel(v);
  };
  // 点击添加按钮
  const onAdd = () => {
    add<RecordType>({
      recommendName: 'businessName123',
      category_1: '11',
      category_2: 'businessKinds123',
      describe: 'describe',
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
  const goback = () => {
    console.log('goback');
  };
  const save = () => {
    console.log('save');
  };
  return (
    <Body>
      <Content>
        <Content.Header title="改进建议"></Content.Header>
        <Content.Body className="common-table-content">
          <Card>
            <Card.Body>
              <Row>
                <Col span={1}></Col>
                <Col span={2}>
                  <Button type="primary" onClick={goback}>
                    返回
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={2}>
                  <Button type="primary" onClick={save}>
                    保存
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row>
                <Col span={1}></Col>
                <Col span={2}>所属分区</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={zoneOptions}
                    value={zone}
                    onChange={value => handleZoneSelect(value)}
                    placeholder="请选择分区"
                    size="full"
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={3}>
                  <Input
                    size="full"
                    value={kind}
                    onChange={value => {
                      setKind(value);
                    }}
                    placeholder="请输入所属分类"
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={2}>风险级别</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={levelOptions}
                    value={dangerLevel}
                    onChange={value => handleLevelSelect(value)}
                    placeholder="请选择风险级别"
                    size="full"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={1}></Col>
                <Col span={2}>相关业务</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={levelOptions}
                    value={dangerLevel}
                    onChange={value => handleLevelSelect(value)}
                    placeholder="请选择风险级别"
                    size="full"
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={2}>相关系统</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={levelOptions}
                    value={dangerLevel}
                    onChange={value => handleLevelSelect(value)}
                    placeholder="请选择风险级别"
                    size="full"
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={2}>相关数据</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={levelOptions}
                    value={dangerLevel}
                    onChange={value => handleLevelSelect(value)}
                    placeholder="请选择风险级别"
                    size="full"
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={2}>相关资产</Col>
                <Col span={3}>
                  <Select
                    appearance="button"
                    options={levelOptions}
                    value={dangerLevel}
                    onChange={value => handleLevelSelect(value)}
                    placeholder="请选择风险级别"
                    size="full"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body title="内容区标题" subtitle="(小标题)" operation={<Button type="link">操作区</Button>}>
              内容区
            </Card.Body>
            <EditorBraft></EditorBraft>
            <Card.Footer>
              <p className={Padding['5n']}>卡片底部</p>
            </Card.Footer>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default AddRecommendPage;
