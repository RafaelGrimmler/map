import { Box } from '@chakra-ui/react';
import Map from '../../components/Map';
import { useUser } from '../../helpers/useUser';
import { Navigate, useParams } from 'react-router-dom';
import UserSelect from './components/UserSelect';
import Navbar from '../../components/Navbar';

const HomePage: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();

  const user = userProfiles?.find((e) => e?.userMap === id);

  if (id && !user) {
    return <Navigate to="/map" />;
  }

  return (
    <Box>
      <Map userProfile={user} />
      {user && <Navbar userProfile={user} />}
      {!user && <UserSelect userProfiles={userProfiles} />}
    </Box>
  );
};

export default HomePage;
