import React from 'react';

import { Button, Layout } from 'antd';

import { useTheme } from '@/Layout/ThemeContext';
import { useAuth } from '@/Service/AuthContext';
import Menu from '@/Components/Menu';
import RoutesPrivate from '@/Routes/Private';
import RoutesAuth from '@/Routes/Auth';

import { MenuOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const { theme, setOpen, open } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <Layout className={`app ${theme}`}>
      <Button
        className={`openMenu ${open && 'none'}`}
        icon={<MenuOutlined size={33} />}
        onClick={() => setOpen(true)}
        type="link"
      />
      {isAuthenticated && <Menu />}
      <Layout>{isAuthenticated ? <RoutesPrivate /> : <RoutesAuth />}</Layout>
    </Layout>
  );
};

export default App;
