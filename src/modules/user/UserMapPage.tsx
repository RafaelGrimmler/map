import Map from '../../components/Map';
import Box from '../../foundation/Box';
import { UseUserContainerReturn } from '../../helpers/useUserContainer';
import UserMapNavbar from './components/UserMapNavbar';
import { useRouting } from './helpers/useRouting';

type UserMapPageProps = { userController: UseUserContainerReturn };

const UserMapPage: React.FC<UserMapPageProps> = ({ userController }) => {
  const routing = useRouting({ userController });

  return (
    <Box position="relative" width="100%" height="100%">
      <Map user={userController?.user} routing={routing} />
      <UserMapNavbar routing={routing} userController={userController} />
    </Box>
  );
};

export default UserMapPage;
