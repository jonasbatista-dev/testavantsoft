import './Content.scss';
import React, { ReactNode } from 'react';
import { Layout } from 'antd';

const Content: React.FC<{
  children?: ReactNode;
  type?: 'default' | 'chart' | 'transparent';
}> = ({ children, type = 'default' }) => {
  return (
    <Layout.Content className={`${type}`}>
      <div className="content">{children}</div>
    </Layout.Content>
  );
};

export default Content;
