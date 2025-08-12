import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from './Layout/ThemeContext';
import './App.scss';

import Main from './Layout/Main';
import { ServiceProvider } from './Api/ApiServiceContext';
import { AuthProvider } from './Api/AuthContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <ServiceProvider>
            <Main />
          </ServiceProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
