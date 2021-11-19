import React from 'react';
import { Layout, Card } from '@tencent/tea-component';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useHistory } from '@tea/app';
const { Body, Content } = Layout;

const AppPage: React.FC = () => {
  return (
    <Body>
      <Content>
        <Content.Header title="AppPage"></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>AppPage</Card.Body>
          </Card>
        </Content.Body>
      </Content>
    </Body>
  );
};

export default AppPage;
