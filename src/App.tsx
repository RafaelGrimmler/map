import React from 'react';
import LoginProvider from './context/Login';
import ThemeProvider from './context/Theme';
import Modules from './modules';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ThemeProvider>
        <LoginProvider>
          <Modules />
        </LoginProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
