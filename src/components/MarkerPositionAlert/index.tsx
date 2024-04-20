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

export type MarkerPositionAlertProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const MarkerPositionAlert: React.FC<MarkerPositionAlertProps> = ({
  open,
  onClose,
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
            Você realmente deseja mudar a posição deste item?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button onClick={() => onConfirm()} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default MarkerPositionAlert;
