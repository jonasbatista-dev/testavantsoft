import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from './Layout/ThemeContext';
import './App.scss';

import Main from './Layout/Main';
import { ServiceProvider } from './Api/ApiServiceContext';

const App = () => {
  return (
    <ServiceProvider>
      <ThemeProvider>
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
    </ServiceProvider>
  );
};

export default App;
