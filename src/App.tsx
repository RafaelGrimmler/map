import React from 'react';
import './App.css';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import Map from './Map';

const colors = {
  brand: {
    1: '#17223B',
    2: '#263859',
    3: '#6B778D',
    4: '#FF6768',
  },
};

const theme = extendTheme({ colors });

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Map />
    </ChakraProvider>
  );
};

export default App;
