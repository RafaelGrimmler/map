import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

export type DeleteAlertProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={open}
      lockFocusAcrossFrames
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
    >
      <AlertDialogOverlay sx={{ zIndex: '9999999' }}>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Alerta
          </AlertDialogHeader>

          <AlertDialogBody>
            Você realmente deseja deletar este item?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef as any}
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              ml={3}
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
