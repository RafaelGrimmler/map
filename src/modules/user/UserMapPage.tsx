import { useState } from 'react';
import Map from '../../components/Map';
import Box from '../../foundation/Box';
import { User } from '../../types';
import UserMapNavbar from './components/UserMapNavbar';
import { UserActionEnum } from './components/UserMapNavbar/utils';

type UserMapPageProps = { user: User };

const UserMapPage: React.FC<UserMapPageProps> = ({ user }) => {
  const [action, setAction] = useState<UserActionEnum>(UserActionEnum.NONE);

  return (
    <Box position="relative" width="100%" height="100%">
      <Map />
      <UserMapNavbar user={user} action={action} setAction={setAction} />
    </Box>
  );
};

export default UserMapPage;
