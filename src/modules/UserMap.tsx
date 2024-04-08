import { Box } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import Map from '../components/Map';
import { useUser } from '../helpers/useUser';

const UserMap: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();

  const user = userProfiles?.find((e) => e?.userMap === id);

  if (userProfiles && !user) {
    return <Navigate to="/map" />;
  }

  return (
    <Box>
      <Map userProfile={user} />
    </Box>
  );
};

export default UserMap;
