import { useContext, useState } from 'react';
import Input from '../../../../foundation/Input';
import { StyledActionLoginContainer, StyledActionTitle } from './styles';
import Box from '../../../../foundation/Box';
import Label from '../../../../foundation/Label';
import Button from '../../../../foundation/Button';
import { UserActionEnum } from './utils';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import InputError from '../../../../foundation/Input/InputError';

type ActionLoginProps = {
  setAction: React.Dispatch<React.SetStateAction<UserActionEnum>>;
};

const ActionLogin: React.FC<ActionLoginProps> = ({ setAction }) => {
  const loginContext = useContext(LoginContext);

  const [text, setText] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const { handleLogin } = loginContext as LoginContextReturn;

  const handleSave = () => {
    if (text.toLowerCase() === process.env.REACT_APP_EDIT_KEY) {
      handleLogin();
      setAction(UserActionEnum.NONE);
    } else {
      setErrorCount(errorCount + 1);
    }
  };

  return (
    <StyledActionLoginContainer>
      <StyledActionTitle>Login</StyledActionTitle>
      <Box>
        <Label>Access token</Label>
        <Input
          autoFocus
          value={text}
          placeholder="Access token"
          onChange={(e) => setText(e?.target?.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
        {errorCount > 0 && <InputError text="Invalid Access Token" />}
      </Box>
      <Box display="flex" gap="8px">
        <Button onClick={() => setAction(UserActionEnum.NONE)}>Cancelar</Button>
        <Button
          contained
          disabled={!text || errorCount >= 5}
          onClick={handleSave}
        >
          Entrar
        </Button>
      </Box>
    </StyledActionLoginContainer>
  );
};

export default ActionLogin;
