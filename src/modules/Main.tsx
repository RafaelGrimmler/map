import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import EditPage from './edit/EditPage';

const Main: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/user/:id" Component={HomePage} />
      <Route path="/user/:id/edit" Component={EditPage} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Main;
