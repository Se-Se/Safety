// 导入依赖
import '@src/configs/index.css';
import { app } from '@tea/app';
import '@tencent/tea-component/lib/tea.css';
//
import 'core-js/stable';
import React from 'react';
import { Redirect } from 'react-router';
import 'regenerator-runtime/runtime';
// 导入样式
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './app.less';
// 导入导航配置
import { menu } from './configs/menu';
// 导入组件
import AppPage from './routes/app';
import BusinessPage from './routes/business';
import Configuration from './routes/configuration';
import DataPage from './routes/data';
import FrameworkPage from './routes/framework';
import GapPage from './routes/gap';
import RecommendPage from './routes/recommend';
import ScenesPage from './routes/scenes';
import { initDatabase } from './services/db';

// mock 本地数据库
initDatabase();

// 路由表，一个路由对应一个组件
const routes = {
  '/': () => <Redirect to="/business" />,
  '/business': BusinessPage,
  '/app': AppPage,
  '/data': DataPage,
  '/framework': FrameworkPage,
  '/scenes': ScenesPage,
  '/gap': GapPage,
  '/recommend': RecommendPage,
  '/configuration': Configuration,
};

// 注册路由表/左侧菜单
app.routes(routes, menu);
