import { User } from '../../../../types';
import {
  StyledContainer,
} from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';

type UserMapNavbarProps = { user: User };

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({ user }) => {
  return (
    <StyledContainer>
      <Header user={user} />
      <Divider />
      dads
    </StyledContainer>
  );
};

export default UserMapNavbar;
