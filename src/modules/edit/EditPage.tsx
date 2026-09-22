import { useLogin } from '../../context/Login';
import { Navigate, useParams } from 'react-router-dom';
import EditMap from './components/EditMap';

const EditPage: React.FC = () => {
  const { id } = useParams();
  const { isLogged } = useLogin();

  const user = []?.find((e) => e?.userMap === id);

  if (!isLogged) return <Navigate to={`/user/${id}`} />;

  return <EditMap user={user} />;
};

export default EditPage;
