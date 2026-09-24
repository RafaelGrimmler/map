import { User } from '../../../../types';
import { StyledContainer } from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';
import Actions from './Actions';
import Box from '../../../../foundation/Box';
import { UserActionEnum } from './utils';

type UserMapNavbarProps = {
  user: User;
  action: UserActionEnum;
  setAction: React.Dispatch<React.SetStateAction<UserActionEnum>>;
};

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({
  user,
  action,
  setAction,
}) => {
  return (
    <StyledContainer>
      <Header user={user} />
      <Divider />
      <Actions user={user} action={action} setAction={setAction} />
      <Box />
    </StyledContainer>
  );
};

export default UserMapNavbar;
