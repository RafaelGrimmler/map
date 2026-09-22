import { Navigate, Route, Routes } from 'react-router-dom';
import UserMapPage from './UserMapPage';

const UserPage: React.FC = () => {
  
  return (
    <Routes>
      <Route path="/map" element={<UserMapPage />} />
      <Route path="/*" element={<Navigate to="map" />} />
    </Routes>
  );
};

export default UserPage;
