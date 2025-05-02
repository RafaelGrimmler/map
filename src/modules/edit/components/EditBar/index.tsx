import { User } from '../../../../types';
import EditBarHeader from '../EditBarHeader';
import { StyledContainer } from './styles';

type EditBarProps = { user: User };

const EditBar: React.FC<EditBarProps> = ({ user }) => {
  return (
    <StyledContainer>
      <EditBarHeader user={user} />
    </StyledContainer>
  );
};

export default EditBar;
