import React from 'react';
import { Layout, Card } from '@tencent/tea-component';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useHistory } from '@tea/app';
const { Body, Content } = Layout;

function UserDetail() {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();

  return (
    <Content>
      <Content.Header title="Users" showBackButton />
      <Content.Body>
        <Card>
          <Card.Body>{name}</Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
}

function UserOverview() {
  return (
    <Content>
      <Content.Header title="Users" />
      <Content.Body>
        <Card>
          <Card.Body>
            <Link to="/gap/alice">Alice</Link>
            <br />
            <Link to="/gap/bob">Bob</Link>
          </Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
}

const GapPage: React.FC = () => {
  const history = useHistory();
  return (
    <Body>
      <Router history={history}>
        <Switch>
          <Route exact path="/gap" component={UserOverview} />
          <Route path="/gap/:name" component={UserDetail} />
        </Switch>
      </Router>
    </Body>
  );
};

export default GapPage;
