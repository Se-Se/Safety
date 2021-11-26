import React from 'react';
import { Layout, Card } from '@tencent/tea-component';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useHistory } from '@tea/app';
const { Body, Content } = Layout;
import AddRecommendPage from './addRecommend';
import RecommendsPage from './recommend';

function AddPage() {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();

  return <AddRecommendPage></AddRecommendPage>;
}

function Overview() {
  return <RecommendsPage></RecommendsPage>;
}

const GapPage: React.FC = () => {
  const history = useHistory();
  return (
    <Body>
      <Router history={history}>
        <Switch>
          <Route exact path="/recommend" component={Overview} />
          <Route path="/recommend/:name" component={AddPage} />
        </Switch>
      </Router>
    </Body>
  );
};

export default GapPage;
