import { Navigate, Route, Routes } from 'react-router-dom';
import PresentationPage from './presentation/PresentationPage';
import EditPage from './edit/EditPage';
import HomePage from './home/HomePage';

const Main: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/user/:id" Component={PresentationPage} />
      <Route path="/user/:id/edit" Component={EditPage} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Main;
