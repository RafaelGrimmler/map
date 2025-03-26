import { useTheme } from '../../theme/useTheme';
import { useUsers } from '../../helpers/useUsers';
import HomeCard from './components/HomeCard';
import Box from '../../foundation/Box';

const HomePage: React.FC = () => {
  const { palette } = useTheme();
  const { users } = useUsers();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={palette.background.main}
    >
      {users?.map((user) => <HomeCard key={user?.userMap} user={user} />)}
    </Box>
  );
};

export default HomePage;
