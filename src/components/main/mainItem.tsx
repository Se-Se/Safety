import React from 'react';
import { Card, Row, Col, Button } from '@tencent/tea-component';

export default function ManiItem(props) {
  const edit = (ev: any) => {
    ev.stopPropagation();
    props.edit();
  };

  return (
    <Card full={false} bordered className="main-card-item">
      <Card.Body style={{ height: '200px', width: '300px', overflow: 'hidden' }} title={props.tradeN}>
        {props.description}
      </Card.Body>
      <Card.Footer>
        <Row style={{ padding: '8px 20px' }}>
          <Col span={18}></Col>
          <Col span={6}>
            <Button
              type="link"
              onClick={ev => {
                edit(ev);
              }}
            >
              编辑
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
