import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { StyledIconButton } from './styles';
import { IoClose } from 'react-icons/io5';
import Input from '../../design/Input';
import { useState } from 'react';

type GalleryPopoverProps = {
  open: boolean;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (t: string) => void;
};

const GalleryPopover: React.FC<GalleryPopoverProps> = ({
  open,
  children,
  setOpen,
  handleSave,
}) => {
  const [text, setText] = useState('');

  const handleClose = () => {
    setOpen(false);
    setText('');
  };

  const onSave = () => {
    handleSave(text);
    handleClose();
  };

  return (
    <Popover isOpen={open}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{'Inserir imagem'}</Text>
          <StyledIconButton
            aria-label="aria-close"
            className="gallery-form-close"
            onClick={() => handleClose()}
            icon={<IoClose fontSize="24px" />}
          />
        </PopoverHeader>
        <PopoverBody>
          <Box display="flex" flexDir="column" gap={1}>
            <Text fontWeight="bold" lineHeight="14px" fontSize="12px">
              Caminho URL:
            </Text>
            <Input
              value={text}
              onChange={(e) => setText(e?.target?.value)}
              placeholder="https://i.imgur.com/"
            />
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={onSave} isDisabled={!text} width="min-content">
                Inserir
              </Button>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GalleryPopover;
