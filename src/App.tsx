import React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import Map from './Map';

const colors = {
  brand: {
    1: '#17223B',
    2: '#263859',
    3: '#6B778D',
    4: '#2ECC71',
    5: '#2ecc9d',
    error: '#ff3333',
  },
};

const theme = extendTheme({ colors });

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ChakraProvider theme={theme}>
        <Map />
      </ChakraProvider>
    </div>
  );
};

export default App;
