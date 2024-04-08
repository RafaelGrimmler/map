import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';

const Main: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/user/:id" Component={Home} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Main;
