import React from 'react';
import { Layout, Card } from '@tencent/tea-component';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useHistory } from '@tea/app';
import MindMap from './components/mindMap';
const { Body, Content } = Layout;

const RecommendsPage: React.FC = () => {
  return (
    <Content>
      <Content.Header title="改进建议" />
      <Content.Body>
        <Card>
          <Card.Body>
            <MindMap></MindMap>
          </Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
};

export default RecommendsPage;
