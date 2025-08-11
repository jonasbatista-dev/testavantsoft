import React from 'react';

import { Button, Layout } from 'antd';

import { useTheme } from './ThemeContext';
import Menu from '../Components/Menu';
import RoutesMain from '../Routes';

import { MenuOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const { theme, setOpen, open } = useTheme();

  return (
    <Layout className={`app ${theme}`}>
      <Button
        className={`openMenu ${open && 'none'}`}
        icon={<MenuOutlined size={33} />}
        onClick={() => setOpen(true)}
        type="link"
      />
      <Menu />
      <Layout>
        <RoutesMain />
      </Layout>
    </Layout>
  );
};

export default App;
