import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  open: boolean;
  setOpen: (item: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [open, setOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const themeCurrent = window.localStorage.getItem('theme');
    themeCurrent && setTheme(themeCurrent === 'light' ? 'light' : 'dark');
  }, []);

  const antdConfig = {
    algorithm:
      theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, open, setOpen }}>
      <ConfigProvider theme={antdConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
