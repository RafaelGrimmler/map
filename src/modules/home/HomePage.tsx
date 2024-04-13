import { Box } from '@chakra-ui/react';
import Map from '../../components/Map';
import { useUser } from '../../helpers/useUser';
import { Navigate, useParams } from 'react-router-dom';
import UserSelect from './components/UserSelect';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();

  const [showMarker, setShowMarker] = useState(true);

  const user = userProfiles?.find((e) => e?.userMap === id);

  if (id && !user) return <Navigate to="/map" />;

  return (
    <Box>
      <Map
        userProfile={user}
        showMarker={id ? showMarker : false}
        handleToggleMarker={id ? () => setShowMarker(!showMarker) : undefined}
      />
      {user && <Navbar userProfile={user} />}
      {!user && <UserSelect userProfiles={userProfiles} />}
    </Box>
  );
};

export default HomePage;
