import { Box, Text } from '@chakra-ui/react';
import { BiUndo, BiSave } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { UseEditLineReturn } from '../../helpers/useEditLine';

type LineComponentProps = {
  lineProps: Partial<UseEditLineReturn>;
};

const LineComponent: React.FC<LineComponentProps> = ({ lineProps }) => {
  const {
    editLine,
    handleCancelLine,
    handleDeleteLine,
    handleSaveLine,
    handleUndoLine,
  } = lineProps;

  const lineLength = editLine?.lines?.length || 0;

  const buttons = [
    {
      icon: <BiUndo />,
      label: 'Desfazer',
      disabled: lineLength < 1,
      onClick: () => handleUndoLine?.(),
    },
    {
      icon: <BiSave />,
      label: 'Salvar',
      disabled: lineLength < 2,
      onClick: () => handleSaveLine?.(),
    },
    {
      icon: <TiCancel />,
      label: 'Cancelar',
      onClick: () => handleCancelLine?.(),
    },
    {
      icon: <MdDeleteForever />,
      label: 'Deletar',
      color: 'brand.error',
      fontWeight: '600',
      onClick: () => handleDeleteLine?.(),
    },
  ];

  return (
    <Box
      w="140px"
      height="min-content"
      display="grid"
      gridTemplateColumns="1fr"
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
          color={e?.disabled ? 'brand.3' : e?.color || 'white'}
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

export default LineComponent;
