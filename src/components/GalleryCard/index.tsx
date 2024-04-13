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
import { StyledContainer, StyledCreateContainer } from './styles';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import { StyledIconButton } from '../MarkerPopup/styles';
import { IoClose } from 'react-icons/io5';
import Input from '../../design/Input';

type GalleryCardProps = {
  isCreate?: boolean;
  handleClick?: () => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({ isCreate, handleClick }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <Popover isOpen={open}>
      <PopoverTrigger>
        <StyledContainer>
          {isCreate && (
            <StyledCreateContainer
              aria-label="aria-add"
              onClick={() => setOpen(true)}
              icon={<IoMdAddCircle fontSize="50px" />}
            />
          )}
        </StyledContainer>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{isCreate ? 'Inserir imagem' : 'Editar imagem'}</Text>
          <StyledIconButton
            aria-label="aria-close"
            onClick={() => setOpen(false)}
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
              <Button isDisabled={!text} width="min-content">
                Inserir
              </Button>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GalleryCard;
