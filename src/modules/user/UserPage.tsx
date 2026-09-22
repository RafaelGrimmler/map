import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import UserMapPage from './UserMapPage';
import { getUserById } from '../../helpers/getUserById';

const UserPage: React.FC = () => {
  const { id } = useParams();
  
  const user = getUserById(id);
  
  if (!user) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/map" element={<UserMapPage />} />
      <Route path="/*" element={<Navigate to="map" />} />
    </Routes>
  );
};

export default UserPage;
