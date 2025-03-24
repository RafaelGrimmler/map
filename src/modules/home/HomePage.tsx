import { Box } from '@chakra-ui/react';
import { useTheme } from '../../theme/useTheme';

const HomePage: React.FC = () => {
  const { palette, handleToggleDarkMode } = useTheme();

  console.log(palette);

  return (
    <Box bg="green" width="100%" height="100px">
      <Box bg="red" onClick={() => handleToggleDarkMode()}>
        test
      </Box>
    </Box>
  );
};

export default HomePage;
