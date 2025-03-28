import { useLogin } from '../../context/Login';
import { Navigate, useParams } from 'react-router-dom';
import EditMap from './components/EditMap';
import { useUsers } from '../../helpers/useUsers';

const EditPage: React.FC = () => {
  const { id } = useParams();
  const { users } = useUsers();
  const { isLogged } = useLogin();

  const user = users?.find((e) => e?.userMap === id);

  if (!isLogged) return <Navigate to={`/user/${id}`} />;

  return <EditMap user={user} />;
};

export default EditPage;
