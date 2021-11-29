import ManiItem from '@src/components/main/mainItem';
import MainModal from '@src/routes/main/components/addModal';
import { DBTableName } from '@src/services';
import { useHistory } from '@tea/app';
import { Button, Card, Col, Layout, Row } from '@tencent/tea-component';
import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useIndexedDB } from 'react-indexed-db';

const { Body, Content } = Layout;

type RecordType = {
  id?: number;
  tradeN?: string;
  description?: string;
  createdAt?: string | number;
};

const MainPage: React.FC = () => {
  const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.trade);
  const [showModal, setShowModal] = useState(false);
  const [dataList, setDataList] = useState<RecordType[]>();
  const [tradeData, setTradeData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const history = useHistory();

  // 拉取数据
  const fetchList = () => {
    getAll()
      .then(data => {
        setDataList(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onAdd = () => {
    setIsEdit(false);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setTradeData(null);
  };
  const handleSave = () => {
    fetchList();
  };
  const handleEdit = (data: any) => {
    setTradeData(data);
    setShowModal(true);
    setIsEdit(true);
  };
  const choseTrade = (ev: any, item: any) => {
    cookie.save('safetyTrade', item.tradeN);
    history.push('/business');
  };
  return (
    <Body>
      <Content>
        <Content.Header
          title="请选择相关行业"
          subtitle={
            <>
              <Button type="primary" onClick={onAdd}>
                新增行业
              </Button>
            </>
          }
        ></Content.Header>
        <Content.Body>
          <MainModal
            close={handleModalClose}
            isEdit={isEdit}
            save={handleSave}
            theTrade={tradeData}
            visible={showModal}
          />
          <Card>
            <Card.Body className="main-card-body">
              <Row style={{ padding: '8px 20px' }}>
                {(dataList || []).map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      onClick={ev => {
                        choseTrade(ev, item);
                      }}
                    >
                      <Col span={6}>
                        <ManiItem
                          tradeN={item.tradeN}
                          description={item.description}
                          edit={() => {
                            handleEdit(item);
                          }}
                        />
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Content.Body>
        <Content.Footer></Content.Footer>
      </Content>
    </Body>
  );
};
export default MainPage;
