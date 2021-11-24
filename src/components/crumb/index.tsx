import { Breadcrumb } from '@tencent/tea-component';
import { Link } from 'react-router-dom';
import React from 'react';

export default function BreadcrumbPage(props: any) {
  return (
    <Breadcrumb>
      {(props.crumbs || []).map((item, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {index + 1 !== props.crumbs.length ? <Link to={item.link}>{item.name}</Link> : item.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
