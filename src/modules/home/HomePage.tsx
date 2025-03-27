import { useUsers } from '../../helpers/useUsers';
import Box from '../../foundation/Box';
import Text from '../../foundation/Text';
import ProfileCard from '../presentation/components/ProfileCard';
import { useTheme } from '@emotion/react';

const HomePage: React.FC = () => {
  const { palette } = useTheme();
  const { users } = useUsers();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="10"
      padding="10"
      bg={palette.background.main}
    >
      <Text fontSize="4xl" fontFamily="fantasy">
        REGISTROS DE PASSEIOS
      </Text>
      <ProfileCard user={users?.[0]} />
      <ProfileCard user={users?.[1]} />
    </Box>
  );
};

export default HomePage;
