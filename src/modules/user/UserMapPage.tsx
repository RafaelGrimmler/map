import Map from '../../components/Map';
import Box from '../../foundation/Box';
import { User } from '../../types';

type UserMapPageProps = { user: User };

const UserMapPage: React.FC<UserMapPageProps> = ({ user }) => {
  return (
    <Box>
      <Map />
    </Box>
  );
};

export default UserMapPage;
