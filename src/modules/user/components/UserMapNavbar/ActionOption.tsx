import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { StyledActionOption } from './styles';

export type ActionOptionProps = {
  label: string;
  iconComponent?: React.ReactNode;
  type?: string;
  selected?: boolean;
  disabled?: boolean;
  notification?: boolean;
  onClick: () => void;
};

const ActionOption: React.FC<ActionOptionProps> = ({
  iconComponent,
  label,
  selected,
  disabled,
  notification,
  onClick,
}) => {
  return (
    <StyledActionOption
      onClick={disabled ? undefined : onClick}
      $selected={selected}
      $disabled={disabled}
    >
      {iconComponent}
      <Text>{label}</Text>
      {notification && (
        <Box boxSize="6px" borderRadius="50%" bg="rgb(255, 63, 63)" />
      )}
    </StyledActionOption>
  );
};

export default ActionOption;
