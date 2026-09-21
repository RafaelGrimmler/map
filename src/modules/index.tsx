import { Navigate, Route, Routes } from 'react-router-dom';
import PresentationPage from './presentation/PresentationPage';
import HomePage from './home/HomePage';

const Modules: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/user/:id" Component={PresentationPage} />
      {/* <Route path="/user/:id/edit" Component={EditPage} /> */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Modules;
