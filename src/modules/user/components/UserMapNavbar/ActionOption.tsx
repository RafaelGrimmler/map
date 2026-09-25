import Text from '../../../../foundation/Text';
import { StyledActionOption } from './styles';

export type ActionOptionProps = {
  label: string;
  iconComponent?: React.ReactNode;
  onClick: () => void;
};

const ActionOption: React.FC<ActionOptionProps> = ({
  iconComponent,
  label,
  onClick,
}) => {
  return (
    <StyledActionOption onClick={onClick}>
      {iconComponent}
      <Text>{label}</Text>
    </StyledActionOption>
  );
};

export default ActionOption;
