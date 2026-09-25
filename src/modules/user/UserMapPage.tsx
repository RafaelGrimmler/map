import Map from '../../components/Map';
import Box from '../../foundation/Box';
import { User } from '../../types';
import UserMapNavbar from './components/UserMapNavbar';
import { useRouting } from './helpers/useRouting';

type UserMapPageProps = { user: User };

const UserMapPage: React.FC<UserMapPageProps> = ({ user }) => {
  const routing = useRouting();

  return (
    <Box position="relative" width="100%" height="100%">
      <Map user={user} routing={routing} />
      <UserMapNavbar routing={routing} user={user} />
    </Box>
  );
};

export default UserMapPage;
