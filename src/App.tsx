import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from './Layout/ThemeContext';
import './App.scss';

import Main from './Layout/Main';

import { AuthProvider } from './Service/AuthContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
