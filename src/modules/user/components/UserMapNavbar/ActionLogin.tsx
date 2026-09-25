import { useContext, useState } from 'react';
import Input from '../../../../foundation/Input';
import { StyledActionLoginContainer } from './styles';
import Box from '../../../../foundation/Box';
import Label from '../../../../foundation/Label';
import Button from '../../../../foundation/Button';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import InputError from '../../../../foundation/Input/InputError';
import ActionBreadcrumb from './ActionBreadcrumb';

type ActionLoginProps = {
  handleClose: () => void;
};

const ActionLogin: React.FC<ActionLoginProps> = ({ handleClose }) => {
  const loginContext = useContext(LoginContext);

  const [text, setText] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const { handleLogin } = loginContext as LoginContextReturn;

  const handleSave = () => {
    if (text.toLowerCase() === process.env.REACT_APP_EDIT_KEY) {
      handleLogin();
      handleClose();
    } else {
      setErrorCount(errorCount + 1);
    }
  };

  return (
    <StyledActionLoginContainer>
      <ActionBreadcrumb
        padding="0px"
        options={[
          { label: 'Menu principal', onClick: handleClose },
          { label: 'Login' },
        ]}
      />
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
        <Button onClick={handleClose}>Cancelar</Button>
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
