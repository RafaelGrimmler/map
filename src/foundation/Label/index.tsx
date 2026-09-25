import { StyledLabel } from './styles';

type LabelProps = { children: React.ReactNode };

const Label: React.FC<LabelProps> = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
