import {
  Box,
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import Input from '../../../../design/Input';
import { useNavigate } from 'react-router-dom';

type LoginModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleSave: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  id,
  isOpen,
  onClose,
  handleSave,
}) => {
  const navigator = useNavigate();

  const [text, setText] = useState('');

  const handleClose = () => {
    setText('');
    onClose();
  };

  const onSave = () => {
    if (text.toLowerCase() === process.env.REACT_APP_EDIT_KEY) {
      handleSave();
      navigator({ pathname: `/user/${id}/edit` });
    }
    handleClose();
  };

  const preventDefault = (e: any) => e?.preventDefault();

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Entrar</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={preventDefault}>
          <ModalBody>
            <Box display="flex" flexDir="column">
              <FormLabel>Chave de acesso:</FormLabel>
              <Input
                autoFocus
                value={text}
                onChange={(e) => setText(e?.target?.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={!text} onClick={onSave} type="submit">
              Entrar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
