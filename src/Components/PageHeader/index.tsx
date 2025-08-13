import { useTheme } from '../../Layout/ThemeContext';
import './PageHeader.scss';

import { Layout, Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const {} = Layout;

const PageHeader: React.FC<{ title: string }> = ({ title, ...props }) => {
  const { toggleTheme } = useTheme();
  return (
    <>
      <Layout.Header className="custom-page-header" {...props}>
        {title}
        <Switch
          unCheckedChildren={<SunOutlined />}
          checkedChildren={<MoonOutlined />}
          onClick={toggleTheme}
        />
      </Layout.Header>
    </>
  );
};

export default PageHeader;
