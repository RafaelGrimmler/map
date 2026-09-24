import Text from '../../../../foundation/Text';
import { StyledActionOption } from './styles';

type ActionOptionType = { label: string; iconComponent: React.ReactNode };

const ActionOption: React.FC<ActionOptionType> = ({ iconComponent, label }) => {
  return (
    <StyledActionOption>
      {iconComponent}
      <Text id="action-option-label">{label}</Text>
    </StyledActionOption>
  );
};

export default ActionOption;
