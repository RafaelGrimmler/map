import { StyledContainer } from './styles';
import Divider from '../../../../components/Divider';
import Header from './Header';
import Actions from './Actions';
import { useRoutingReturn } from '../../helpers/useRouting';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';
import { UseCitiesReturn } from '../../helpers/useCities';
import View from './View';

type UserMapNavbarProps = {
  userController: UseUserContainerReturn;
  cityController: UseCitiesReturn;
  routing: useRoutingReturn;
};

const UserMapNavbar: React.FC<UserMapNavbarProps> = ({
  userController,
  cityController,
  routing,
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
      <Divider />
      <View cityController={cityController} />
    </StyledContainer>
  );
};

export default UserMapNavbar;
