import { useContext } from 'react';
import { User } from '../../../../types';
import { StyledActionsContainer } from './styles';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import { UserActionEnum } from './utils';
import ActionOption from './ActionOption';
import { TbRouteSquare, TbUpload, TbDownload } from 'react-icons/tb';

type ActionsType = {
  user: User;
  action: UserActionEnum;
  setAction: React.Dispatch<React.SetStateAction<UserActionEnum>>;
};

type OptionType = {
  label: string;
  type?: UserActionEnum;
  iconComponent: React.ReactNode;
};

const Actions: React.FC<ActionsType> = ({ user }) => {
  const loginContext = useContext(LoginContext);

  const { isLogged } = loginContext as LoginContextReturn;

  const options: OptionType[] = isLogged
    ? [
        {
          label: 'Rotas',
          type: UserActionEnum.ROUTES,
          iconComponent: <TbRouteSquare />,
        },
        { label: 'Upload', iconComponent: <TbUpload /> },
        { label: 'Download', iconComponent: <TbDownload /> },
      ]
    : [
        {
          label: 'Login',
          type: UserActionEnum.LOGIN,
          iconComponent: <TbDownload />,
        },
      ];

  return (
    <StyledActionsContainer>
      {options?.map((option) => (
        <ActionOption
          key={option?.label}
          iconComponent={option?.iconComponent}
          label={option?.label}
        />
      ))}
    </StyledActionsContainer>
  );
};

export default Actions;
