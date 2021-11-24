// 导入依赖
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Redirect } from 'react-router';
import React from 'react';

// 导入依赖
import { app } from '@tea/app';

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
import MainPage  from './routes/main';

// 导入样式
import '@tencent/tea-component/lib/tea.css';
import './app.less';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import '@src/configs/index.css';
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
  '/main':MainPage,
};

// 注册路由表/左侧菜单
app.routes(routes, menu);
