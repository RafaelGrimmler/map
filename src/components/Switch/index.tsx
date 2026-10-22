import Box from '../../foundation/Box';
import { StyledContainer } from './styles';

type SwitchProps = {
  checked: boolean;
  onClick: () => void;
};

const Switch: React.FC<SwitchProps> = ({ checked, onClick }) => {
  return (
    <StyledContainer onClick={onClick} $checked={checked}>
      <Box className="indicator" />
    </StyledContainer>
  );
};

export default Switch;
