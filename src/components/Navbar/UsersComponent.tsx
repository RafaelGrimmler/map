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
            <Avatar
              size="sm"
              src={
                'https://lh3.googleusercontent.com/pw/ADCreHfdIyP61gq212V6oAg0DaKExmacjM1MqE85OMoEjbnQ28lw7VC05f02InjaLLX1bq3MWYiGfR28Gbg731AtFpRsIo1JW0q5rKQMovUmn5pCYgmssLZOyAu-mvVRdxEpZPxlbpkKVIiNj-mbnkdfXuA9w2eaosF-M3_jrFAMNNHoovBg8AHOTepk1mPwC5dpAFoX55f5GbMcjUpJhf6gxBc0oiC6kLcnkCFUEJi3dxR2lJJMHEq1yEz_50w5U-Zrk8FKFAz26cUWx12IJXmICD71_hs7M5MgrWDrmNJkNCoF7E1lCKl25gtcwRn_JPd9GIq4FmT1QkaCO82vDm_eE5AJ8ZYwdGrfzZw4z2Rs-LdcvCvFj-FMqwWloYq2OvvAY_kFJBo3b79kNAdO__CimzknmlYufH0faKkmqhZdF18nMDtdYNotwMahBxADvbw_jncO8L_YcthrAawAVwk3cnBOv5sR3AYm8HZQNwfmFD32vZ_yywGY93F5AvIHr5u6hfHzhAaXywW5i0K0sPbomVuwtCJfJDZ6gPX_u3PxSk9jJ4QGYInqn3tabRLywF5s0yyS2Tv8IVHhQmBF0tDYmmWmx9lKnbnC3NwSR9yJnCMapzz-0Vxjdh2GcM0PVMywpr3N9evNQ0Ub-kG8uKtrkB_u_iBQxBwXvG8nYcB5P_fzvjoZJWqjw7Id50aOeByoPNZYZBASidwLW-vjNjNoT2bZmLUutw4n4ddLW6QsWgKQRVPOFwFTdxDN4VgMMmb9W9gg4b9_lYgyLkoGIPOwfqYTn7krntuG5HCk5Pqghvlp-Dc6wUTVPCWKPo10uZa9uBlOYrhQa5bnvMpHq5QFfZV4hkmoE7rCI2pObSiByrTA7mTMByoTjvoWnlkpeiXjqFMJ1ilGDtBdPJSkl6PA93CW7b5nMUomvfyKK0npEGIWWgV1uPxLcoX66TAlJYpXU9qzG1R77KNZyPyQ_X7p_iwqCLCt86Ld=w1275-h621-s-no?authuser=1'
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
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
