import { Box, Input, Text } from '@chakra-ui/react';
import { MdOutlinePolyline } from 'react-icons/md';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { PiUsersThreeBold } from 'react-icons/pi';
import { HiLocationMarker } from 'react-icons/hi';
import { NavbarEnum } from '../../Enums';
import LineComponent from './LineComponent';
import { UseLineReturn } from '../../helpers/useLine';
import { Fragment } from 'react';
import MarkerComponent from './MarkerComponent';
import { UseMarkerReturn } from '../../helpers/useMarker';
import { UseFileReturn } from '../../helpers/useFile';
import UsersComponent from './UsersComponent';
import { User } from '../../types';

type NavbarProps = {
  lineProps: Partial<UseLineReturn>;
  markerProps: Partial<UseMarkerReturn>;
  fileProps: UseFileReturn;
  selected?: NavbarEnum;
  user?: User;
  handleSelection: (e?: NavbarEnum) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  lineProps,
  markerProps,
  fileProps,
  selected,
  user,
  handleSelection,
}) => {
  const isLogged = !!user;

  const buttons = [
    {
      icon: <MdOutlinePolyline />,
      label: 'Linha',
      action: NavbarEnum.LINE,
      requireLogin: true,
      component: <LineComponent lineProps={lineProps} />,
      onClick: () => {
        handleSelection(NavbarEnum.LINE);
        lineProps?.handleStartEdit?.();
      },
    },
    {
      icon: <HiLocationMarker />,
      label: 'Marcador',
      action: NavbarEnum.MARKER,
      requireLogin: true,
      hidden: true,
      component: <MarkerComponent markerProps={markerProps} />,
      // onClick: () => handleSelection(NavbarEnum.MARKER),
      onClick: () => {},
    },
    {
      icon: <PiUsersThreeBold />,
      label: 'Usuários',
      action: NavbarEnum.USERS,
      component: (
        <UsersComponent
          user={user}
          fileProps={fileProps}
          handleSelection={handleSelection}
        />
      ),
      onClick: () => handleSelection(NavbarEnum.USERS),
    },
    {
      icon: <FiUpload />,
      label: 'Upload',
      action: 'UPLOAD',
    },
    {
      icon: <FiDownload />,
      label: 'Download',
      action: 'DOWNLOAD',
      requireLogin: true,
      onClick: fileProps?.handleExportFile,
    },
  ];

  const selectDisable =
    selected === NavbarEnum.MARKER || selected === NavbarEnum.LINE;

  return (
    <Box w="160px" position="absolute" left="40px" top="40px" zIndex="99999">
      {user && (
        <Text pb="2" color="white">
          Entrou como {user?.name}!
        </Text>
      )}
      <Box display="grid" gridTemplateColumns="1fr" position="relative">
        {buttons
          ?.filter((e) => !e?.hidden && (isLogged || !e?.requireLogin))
          ?.map((e, i) => {
            const isSelected = selected === e.action;
            const isUpload = e?.action === 'UPLOAD';

            return (
              <Fragment key={e?.label}>
                <Input
                  type="file"
                  display="none"
                  id="upload"
                  onChange={(o) =>
                    fileProps?.handleReadFile?.(o.target.files?.[0])
                  }
                />
                <label htmlFor={isUpload ? 'upload' : undefined}>
                  <Box
                    alignItems="center"
                    display="flex"
                    gap="4"
                    pl="2"
                    h="40px"
                    w="100%"
                    bg={isSelected ? 'whiteAlpha.800' : 'blackAlpha.700'}
                    cursor={selectDisable ? 'default' : 'pointer'}
                    color={isSelected ? 'gray.800' : 'gray.200'}
                    borderTopLeftRadius={i === 0 ? '4px' : '0px'}
                    borderBottomLeftRadius={
                      i === buttons?.length - 1 ? '4px' : '0px'
                    }
                    _hover={{
                      bg: !selectDisable ? 'whiteAlpha.800' : undefined,
                      color: !selectDisable ? 'gray.800' : undefined,
                    }}
                    onClick={!selectDisable ? e?.onClick : undefined}
                  >
                    <Box fontSize="19px">{e.icon}</Box>
                    <Text>{e.label}</Text>
                  </Box>
                </label>
                {isSelected && (
                  <Box
                    w="auto"
                    h="auto"
                    bg="whiteAlpha.800"
                    position="absolute"
                    left="160px"
                  >
                    {e.component}
                  </Box>
                )}
              </Fragment>
            );
          })}
      </Box>
    </Box>
  );
};

export default Navbar;
