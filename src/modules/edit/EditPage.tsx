import { useContext } from 'react';
import { LoginContext, LoginContextReturn } from '../../context/Login';
import { Navigate, useParams } from 'react-router-dom';
import EditMap from './components/EditMap';
import { useUser } from '../../helpers/useUser';

const EditPage: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();
  const { isLogged } = useContext(LoginContext) as LoginContextReturn;

  const user = userProfiles?.find((e) => e?.userMap === id);

  if (!isLogged) return <Navigate to={`/user/${id}`} />;

  return <EditMap userProfile={user} />;
};

export default EditPage;
