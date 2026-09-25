import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import UserMapPage from './UserMapPage';
import { getUserById } from '../../helpers/getUserById';
import { useEffect, useState } from 'react';

const UserPage: React.FC = () => {
  const { id } = useParams();

  const [user, setUser] = useState(getUserById(id));

  if (!user) return <Navigate to="/" />;

  useEffect(() => {
    setUser(getUserById(id));
  }, [id]);

  return (
    <Routes>
      <Route path="/map" element={<UserMapPage user={user} />} />
      <Route path="/*" element={<Navigate to="map" />} />
    </Routes>
  );
};

export default UserPage;
