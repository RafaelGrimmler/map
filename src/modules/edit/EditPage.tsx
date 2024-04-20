import { useContext } from 'react';
import { LoginContext, LoginContextReturn } from '../../context/Login';
import { Navigate, useParams } from 'react-router-dom';
import EditMap from './components/EditMap';
import { useUser } from '../../helpers/useUser';
import { UserProfile } from '../../types';
import { getImages } from '../../helpers/getImages';
import { getMarkers } from '../../helpers/getMarkers';

const EditPage: React.FC = () => {
  const { id } = useParams();
  const { userProfiles } = useUser();
  const { isLogged } = useContext(LoginContext) as LoginContextReturn;

  const user = userProfiles?.find((e) => e?.userMap === id);
  const images = getImages();
  const markers = getMarkers();

  if (!isLogged) return <Navigate to={`/user/${id}`} />;

  return (
    <EditMap
      userProfile={user as UserProfile}
      defaultImages={images}
      defaultMarkers={markers}
    />
  );
};

export default EditPage;
