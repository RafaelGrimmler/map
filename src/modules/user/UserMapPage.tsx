import Map from '../../components/Map';
import Box from '../../foundation/Box';
import { User } from '../../types';
import UserMapNavbar from './components/UserMapNavbar';

type UserMapPageProps = { user: User };

const UserMapPage: React.FC<UserMapPageProps> = ({ user }) => {
  return (
    <Box position="relative" width="100%" height="100%">
      <Map />
      <UserMapNavbar user={user} />
    </Box>
  );
};

export default UserMapPage;
