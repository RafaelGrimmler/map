import React from 'react';
import Main from './modules/Main';
import LoginProvider from './context/Login';
import ThemeProvider from './context/Theme';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ThemeProvider>
        <LoginProvider>
          <Main />
        </LoginProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
