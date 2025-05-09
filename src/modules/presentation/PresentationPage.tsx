import { Box } from '@chakra-ui/react';
import Map from '../../components/Map';
import { useUsers } from '../../helpers/useUsers';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import { useContext, useState } from 'react';
import LoginModal from '../../modules/presentation/components/LoginModal';
import { LoginContext, LoginContextReturn } from '../../context/Login';
import { MdOutlineLogin } from 'react-icons/md';

const PresentationPage: React.FC = () => {
  const navigator = useNavigate();
  const loginContext = useContext(LoginContext);
  const { id } = useParams();
  const { users } = useUsers();

  const [open, setOpen] = useState(false);

  const { isLogged, handleLogin } = loginContext as LoginContextReturn;

  const user = users?.find((e) => e?.userMap === id);

  if (id && !user) return <Navigate to="/map" />;

  const onLogin = () => {
    if (isLogged) navigator({ pathname: `/user/${user?.userMap}/edit` });
    else setOpen(true);
  };

  return (
    <Box>
      <Map user={user} />
      {user && (
        <Navbar
          image={user?.image}
          items={[
            { icon: <MdOutlineLogin />, label: 'Entrar', onClick: onLogin },
          ]}
        />
      )}

      {open && (
        <LoginModal
          id={user?.userMap}
          handleSave={handleLogin}
          isOpen
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default PresentationPage;
