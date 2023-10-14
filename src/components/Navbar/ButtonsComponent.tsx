import { Box, BoxProps, Text } from '@chakra-ui/react';
import { BiUndo, BiSave } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosReturnLeft } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

type ButtomProps = {
  fontWeight?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonsComponentProps = {
  boxProps?: BoxProps;
  undoProps?: ButtomProps;
  saveProps?: ButtomProps;
  cancelProps?: ButtomProps;
  deleteProps?: ButtomProps;
  returnProps?: ButtomProps;
};

const ButtonsComponent: React.FC<ButtonsComponentProps> = ({
  cancelProps,
  deleteProps,
  saveProps,
  undoProps,
  returnProps,
  boxProps: props,
}) => {
  const buttons = [];

  if (returnProps)
    buttons?.push({
      icon: <IoIosReturnLeft />,
      label: 'Voltar',
      ...returnProps,
    });
  if (undoProps)
    buttons?.push({ icon: <BiUndo />, label: 'Desfazer', ...undoProps });
  if (saveProps)
    buttons?.push({ icon: <BiSave />, label: 'Salvar', ...saveProps });
  if (cancelProps)
    buttons?.push({ icon: <TiCancel />, label: 'Cancelar', ...cancelProps });
  if (deleteProps)
    buttons?.push({
      icon: <MdDeleteForever />,
      label: 'Deletar',
      color: 'brand.error',
      fontWeight: '600',
      ...deleteProps,
    });

  return (
    <Box
      w="140px"
      height="min-content"
      display="grid"
      gridTemplateColumns="1fr"
      {...props}
    >
      {buttons.map((e) => (
        <Box
          key={e.label}
          w="100%"
          h="40px"
          alignItems="center"
          display="flex"
          gap="4"
          pl="2"
          cursor={e?.disabled ? 'default' : 'pointer'}
          fontWeight={e.fontWeight || undefined}
          color={e?.disabled ? 'gray.500' : e?.color || 'gray.800'}
          _hover={{ bg: !e?.disabled ? 'rgba(0,0,0,0.05)' : undefined }}
          onClick={!e?.disabled ? e?.onClick : undefined}
          bg={e?.disabled ? 'rgba(0,0,0,0.2)' : undefined}
        >
          <Box fontSize="21px">{e.icon}</Box>
          <Text>{e.label}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ButtonsComponent;
