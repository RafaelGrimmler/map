import { Box, Center, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Textarea from '../Textarea';
import { BiSave } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { UseMarkerReturn } from '../../helpers/useMarker';

type MarkerComponentProps = {
  markerProps: Partial<UseMarkerReturn>;
};

const MarkerComponent: React.FC<MarkerComponentProps> = ({ markerProps }) => {
  const [value, setValue] = useState('padrao');

  const { editMarker, handleSaveLine } = markerProps;

  const buttons = [
    {
      icon: <BiSave />,
      label: 'Salvar',
      disabled: editMarker?.position?.length === 0,
      onClick: () => handleSaveLine?.(),
    },
    {
      icon: <TiCancel />,
      label: 'Cancelar',
      onClick: () => {},
    },
    {
      icon: <MdDeleteForever />,
      label: 'Deletar',
      color: 'brand.error',
      fontWeight: '600',
      onClick: () => {},
    },
  ];

  return (
    <Box w="240px" minH="120px" pt="2" display="flex" flexDir="column" gap="3">
      <Center flexDir="column" gap="2">
        <Text fontWeight="bold">Tipo de marcador</Text>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row" gap="5">
            <Radio value="padrao">Padrão</Radio>
            <Radio value="imagem">Imagem</Radio>
          </Stack>
        </RadioGroup>
      </Center>
      {value === 'padrao' && (
        <Center p="2">
          <Textarea
            placeholder="Escreva algo para descrever o marcador"
            resize={'none'}
          />
        </Center>
      )}
      <Box
        w="100%"
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
    </Box>
  );
};

export default MarkerComponent;
