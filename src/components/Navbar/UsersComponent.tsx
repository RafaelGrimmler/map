import { Avatar, Box, Text } from '@chakra-ui/react';
import { getUsers } from '../../helpers/getUsers';
import ButtonsComponent from './ButtonsComponent';
import { NavbarEnum } from '../../Enums';
import { UseFileReturn } from '../../helpers/useFile';
import { User } from '../../types';

type UsersComponentProps = {
  user?: User;
  fileProps: UseFileReturn;
  handleSelection: (e?: NavbarEnum) => void;
};

const UsersComponent: React.FC<UsersComponentProps> = ({
  user,
  fileProps,
  handleSelection,
}) => {
  const { handleLoadMapByUser } = fileProps || {};

  const users = getUsers();

  return (
    <Box display="flex" flexDir="column">
      {users?.map((e) => {
        const isSelected = e?.id === user?.id;

        return (
          <Box
            key={e?.id}
            display="flex"
            alignItems="center"
            p="2"
            gap="2"
            onClick={() => handleLoadMapByUser?.(e)}
            cursor="pointer"
            _hover={{ bg: !isSelected ? 'rgba(0,0,0,0.05)' : undefined }}
          >
            <Avatar size="sm" />
            <Box display="flex" flexDirection="column" gap="0">
              <Text fontSize="16px" lineHeight="16px">
                {e.name}
              </Text>
              <Text
                fontSize="12px"
                lineHeight="14px"
                whiteSpace="nowrap"
                opacity="0.8"
              >
                {e.vehicle}
              </Text>
            </Box>
          </Box>
        );
      })}
      <Box width="100%" py="2" display="flex" justifyContent="center">
        <Box width="80%" height="1px" bg="black" />
      </Box>
      <ButtonsComponent
        returnProps={{ onClick: () => handleSelection(undefined) }}
        boxProps={{ width: '100%' }}
      />
    </Box>
  );
};

export default UsersComponent;
