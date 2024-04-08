import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';

const Main: React.FC = () => {
  return (
    <Routes>
      <Route path="/map" Component={Home} />
      <Route path="/map/user/:id" Component={Home} />
      <Route path="/map/*" element={<Navigate to="/map" />} />
    </Routes>
  );
};

export default Main;
