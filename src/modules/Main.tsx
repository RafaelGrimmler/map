import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" Component={Home} />
        <Route path="/map/*" element={<Navigate to="/map" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
