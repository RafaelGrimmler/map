import { User } from '../../../../types';
import { StyledContainer } from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';
import Actions from './Actions';
import Box from '../../../../foundation/Box';
import { useRoutingReturn } from '../../helpers/useRouting';

type UserMapNavbarProps = { user: User; routing: useRoutingReturn };

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({ user, routing }) => {
  return (
    <StyledContainer>
      <Header user={user} />
      <Divider />
      <Actions routing={routing} user={user} />
      <Box />
    </StyledContainer>
  );
};

export default UserMapNavbar;
