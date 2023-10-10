import { Box, Text } from '@chakra-ui/react';
import { MdOutlinePolyline } from 'react-icons/md';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { NavbarEnum } from '../../Enums';
import LineComponent from './LineComponent';
import { UseEditLineReturn } from '../../helpers/useEditLine';

type NavbarProps = {
  lineProps: Partial<UseEditLineReturn>;
  selected?: NavbarEnum;
  handleSelection: (e: NavbarEnum) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  lineProps,
  selected,
  handleSelection,
}) => {
  const buttons = [
    {
      icon: <MdOutlinePolyline />,
      label: 'Linha',
      action: NavbarEnum.LINE,
      component: <LineComponent lineProps={lineProps} />,
      onClick: () => {
        handleSelection(NavbarEnum.LINE);
        lineProps?.handleAddLine?.();
      },
    },
    {
      icon: <HiLocationMarker />,
      label: 'Marcador',
      action: NavbarEnum.MARKER,
      onClick: () => {
        handleSelection(NavbarEnum.MARKER);
      },
    },
    {
      icon: <FiUpload />,
      label: 'Upload',
      action: 'UPLOAD',
      onClick: () => console.log('aqui3'),
    },
    {
      icon: <FiDownload />,
      label: 'Download',
      action: 'DOWNLOAD',
      onClick: () => console.log('aqui4'),
    },
  ];

  return (
    <Box w="140px" position="absolute" left="40px" top="40px" zIndex="99999">
      <Box display="grid" gridTemplateColumns="1fr" position="relative">
        {buttons?.map((e, i) => (
          <>
            <Box
              key={e?.label}
              alignItems="center"
              display="flex"
              gap="4"
              pl="2"
              h="40px"
              w="100%"
              bg={selected === e.action ? 'brand.4' : 'brand.3'}
              cursor={selected ? 'default' : 'pointer'}
              color="white"
              borderTopLeftRadius={i === 0 ? '4px' : '0px'}
              borderBottomLeftRadius={i === buttons?.length - 1 ? '4px' : '0px'}
              _hover={{ bg: !selected ? 'brand.4' : undefined }}
              onClick={!selected ? e?.onClick : undefined}
            >
              <Box fontSize="19px">{e.icon}</Box>
              <Text>{e.label}</Text>
            </Box>
            {selected === e.action && (
              <Box
                w="auto"
                h="auto"
                bg="brand.4"
                position="absolute"
                left="140px"
              >
                {e.component}
              </Box>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
