import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import UserPage from './user/UserPage';

const Modules: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path='/user/:id/*' Component={UserPage} />
      {/* <Route path="/user/:id" Component={PresentationPage} /> */}
      {/* <Route path="/user/:id/edit" Component={EditPage} /> */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Modules;
