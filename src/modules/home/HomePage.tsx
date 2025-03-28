import { useUsers } from '../../helpers/useUsers';
import Box from '../../foundation/Box';
import Text from '../../foundation/Text';
import ProfileCard from './components/ProfileCard';
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
      padding="16"
      bg={palette.background.main}
    >
      <Text fontSize="6xl" fontFamily="fantasy">
        REGISTROS DAS ANDANÇAS
      </Text>
      <Box display="flex" gap="14" pb="14">
        {users?.map((user) => <ProfileCard key={user?.userMap} user={user} />)}
      </Box>
    </Box>
  );
};

export default HomePage;
