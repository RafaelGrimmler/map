import { Box } from '@chakra-ui/react';
import Map from '../../components/Map';
import { useUsers } from '../../helpers/useUsers';
import { Navigate, useParams } from 'react-router-dom';
import UserSelect from './components/UserSelect';
import Navbar from '../../components/Navbar';

const PresentationPage: React.FC = () => {
  const { id } = useParams();
  const { users } = useUsers();

  const user = users?.find((e) => e?.userMap === id);

  if (id && !user) return <Navigate to="/map" />;

  return (
    <Box>
      <Map user={user} />
      {user && <Navbar user={user} />}
      {!user && <UserSelect users={users} />}
    </Box>
  );
};

export default PresentationPage;
