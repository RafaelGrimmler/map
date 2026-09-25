import { StyledErrorText } from './styles';
import { BiSolidErrorCircle } from 'react-icons/bi';

type InputErrorProps = { text: string };

const InputError: React.FC<InputErrorProps> = ({ text }) => {
  return (
    <StyledErrorText>
      <BiSolidErrorCircle />
      {text}
    </StyledErrorText>
  );
};

export default InputError;
