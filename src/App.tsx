import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from './Layout/ThemeContext';
import './App.scss';

import Main from './Layout/Main';

import { AuthProvider } from './Service/AuthContext';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
