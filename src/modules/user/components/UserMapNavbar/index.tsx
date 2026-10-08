import { StyledContainer } from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';
import Actions from './Actions';
import Box from '../../../../foundation/Box';
import { useRoutingReturn } from '../../helpers/useRouting';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';
import { UseCitiesReturn } from '../../helpers/useCities';

type UserMapNavbarProps = {
  userController: UseUserContainerReturn;
  routing: useRoutingReturn;
  cityController: UseCitiesReturn;
};

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({
  userController,
  routing,
  cityController,
}) => {
  return (
    <StyledContainer>
      <Header user={userController?.user} />
      <Divider />
      <Actions
        routing={routing}
        userController={userController}
        cityController={cityController}
      />
      <Box />
    </StyledContainer>
  );
};

export default UserMapNavbar;
