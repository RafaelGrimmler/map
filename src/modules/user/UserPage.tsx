import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import UserMapPage from './UserMapPage';
import { useUserContainer } from '../../helpers/useUserContainer';
import { useEffect } from 'react';

const UserPage: React.FC = () => {
  const { id } = useParams();
  const userController = useUserContainer(id);

  if (!userController?.user) return <Navigate to="/" />;

  useEffect(() => {
    userController?.reset();
  }, [id]);

  return (
    <Routes>
      <Route
        path="/map"
        element={<UserMapPage userController={userController} />}
      />
      <Route path="/*" element={<Navigate to="map" />} />
    </Routes>
  );
};

export default UserPage;
