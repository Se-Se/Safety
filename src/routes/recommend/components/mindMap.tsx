import React, { useEffect, useState } from 'react';
import { Layout, Card } from '@tencent/tea-component';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useHistory } from '@tea/app';
import { Graph, Cell, Node, Path } from '@antv/x6';
import Hierarchy from '@antv/hierarchy';
import insertCss from 'insert-css';

const { Body, Content } = Layout;

const MindMap: React.FC = () => {
  const [graph, setGraph] = useState(null);
  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
    });
    // setGraph(graph);
  }, []);

  return (
    <Card>
      <Card.Body>
        <div id="container"></div>
      </Card.Body>
    </Card>
  );
};

export default MindMap;
