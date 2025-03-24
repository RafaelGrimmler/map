import { useLogin } from '../../context/Login';
import { Navigate, useParams } from 'react-router-dom';
import EditMap from './components/EditMap';
import { useUser } from '../../helpers/useUser';
import { UserProfile } from '../../types';

const EditPage: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();
  const { isLogged } = useLogin();

  const user = userProfiles?.find((e) => e?.userMap === id);

  if (!isLogged) return <Navigate to={`/user/${id}`} />;

  return <EditMap userProfile={user as UserProfile} />;
};

export default EditPage;
