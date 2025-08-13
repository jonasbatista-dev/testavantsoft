import './Menu.scss';

import React, { useEffect, useState } from 'react';
import {
  BarChartOutlined,
  CloseOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useTheme } from '../../Layout/ThemeContext';

import { Button, Menu as MenuAntd, Layout, Avatar } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Service/AuthContext';

const items = [
  {
    key: '/client/add',
    icon: <UserAddOutlined />,
    label: 'Novo Cliente',
  },
  {
    key: '/client/list',
    icon: <UnorderedListOutlined />,
    label: 'Lista de Clientes',
  },
  {
    key: '/report',
    icon: <BarChartOutlined />,
    label: 'Relatórios',
  },
];

const Menu: React.FC = () => {
  const { theme, open, setOpen } = useTheme();
  const { user, logout } = useAuth();
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const filter = (pathname: string, steps: number) =>
    pathname
      .split('/')
      .filter((_, i) => i <= steps)
      .join('/');

  const setKeys = (pathname: string) => {
    const keys = [
      filter(pathname, 1),
      filter(pathname, 2),
      filter(pathname, 3),
    ];
    setOpenKeys(keys);
    setSelectedKeys(keys);
  };

  useEffect(() => setKeys(pathname), [pathname]);

  return (
    <>
      <Layout.Sider
        width={open ? '100dvw' : 200}
        className={`Menu ${open && 'open'}`}
      >
        <div className="avatar">
          <Avatar size={50} icon={<UserOutlined />} />
          <div>
            <p>{user?.name ?? '--'}</p>
            <a onClick={logout}>Sair</a>
          </div>
        </div>

        <MenuAntd
          theme={theme === 'light' ? 'light' : 'dark'}
          mode="inline"
          items={items}
          onClick={(value) => {
            setKeys(value?.key);
            navigate(value?.key);
            setOpen(false);
          }}
          onOpenChange={(keys: string[]) =>
            setOpenKeys([keys[keys.length - 1]])
          }
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        ></MenuAntd>
        {open && (
          <Button
            className="close"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            type="link"
          />
        )}
      </Layout.Sider>
    </>
  );
};

export default Menu;
