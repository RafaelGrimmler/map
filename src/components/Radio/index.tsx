import Box from '../../foundation/Box';
import Text from '../../foundation/Text';
import { StyledOption } from './styles';

export type RadioOption = { value: string; label: string; description: string };

type RadioProps = {
  options: RadioOption[];
  selected?: string;
  onChange: (value: string) => void;
};

const Radio: React.FC<RadioProps> = ({ options, selected, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap="2px">
      {options?.map((o) => (
        <StyledOption key={o?.value} onClick={() => onChange(o?.value)}>
          <Box height="18px" display="flex" alignItems="center">
            <Box
              width="9px"
              height="9px"
              borderRadius="50%"
              bg={
                selected === o?.value
                  ? 'rgb(255, 174, 0)'
                  : 'rgb(196, 196, 196)'
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="2px">
            <Text fontSize="12px" fontWeight="700">
              {o?.label}
            </Text>
            <Text fontSize="10px" lineHeight="10px">
              {o?.description}
            </Text>
          </Box>
        </StyledOption>
      ))}
    </Box>
  );
};

export default Radio;
