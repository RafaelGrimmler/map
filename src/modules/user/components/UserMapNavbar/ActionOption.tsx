import Text from '../../../../foundation/Text';
import { StyledActionOption } from './styles';

export type ActionOptionProps = {
  label: string;
  iconComponent?: React.ReactNode;
  type?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const ActionOption: React.FC<ActionOptionProps> = ({
  iconComponent,
  label,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <StyledActionOption
      onClick={onClick}
      $selected={selected}
      $disabled={disabled}
    >
      {iconComponent}
      <Text>{label}</Text>
    </StyledActionOption>
  );
};

export default ActionOption;
