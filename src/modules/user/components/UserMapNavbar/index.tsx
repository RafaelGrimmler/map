import { StyledContainer } from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';
import Actions from './Actions';
import Box from '../../../../foundation/Box';
import { useRoutingReturn } from '../../helpers/useRouting';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';

type UserMapNavbarProps = {
  userController: UseUserContainerReturn;
  routing: useRoutingReturn;
};

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({
  userController,
  routing,
}) => {
  return (
    <StyledContainer>
      <Header user={userController?.user} />
      <Divider />
      <Actions routing={routing} userController={userController} />
      <Box />
    </StyledContainer>
  );
};

export default UserMapNavbar;
