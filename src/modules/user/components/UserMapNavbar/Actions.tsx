import { useContext } from 'react';
import { User } from '../../../../types';
import { StyledActionsContainer } from './styles';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import { UserActionEnum } from './utils';
import ActionOption, { ActionOptionType } from './ActionOption';
import { TbRouteSquare, TbUpload, TbDownload, TbLogin2 } from 'react-icons/tb';
import ActionLogin from './ActionLogin';

type ActionsType = {
  user: User;
  action: UserActionEnum;
  setAction: React.Dispatch<React.SetStateAction<UserActionEnum>>;
};

const Actions: React.FC<ActionsType> = ({ user, action, setAction }) => {
  const loginContext = useContext(LoginContext);

  const { isLogged } = loginContext as LoginContextReturn;

  const options: ActionOptionType[] = isLogged
    ? [
        {
          label: 'Rotas',
          iconComponent: <TbRouteSquare />,
          onClick: () => setAction(UserActionEnum.ROUTES),
        },
        { label: 'Upload', iconComponent: <TbUpload />, onClick: () => {} },
        { label: 'Download', iconComponent: <TbDownload />, onClick: () => {} },
      ]
    : [
        {
          label: 'Login',
          iconComponent: <TbLogin2 />,
          onClick: () => setAction(UserActionEnum.LOGIN),
        },
      ];

  if (action !== UserActionEnum.NONE) {
    switch (action) {
      case UserActionEnum.LOGIN:
        return <ActionLogin setAction={setAction} />;
      case UserActionEnum.ROUTES:
        return <></>;
      default:
        return null;
    }
  }

  return (
    <StyledActionsContainer>
      {options?.map((option) => (
        <ActionOption
          key={option?.label}
          iconComponent={option?.iconComponent}
          label={option?.label}
          onClick={option?.onClick}
        />
      ))}
    </StyledActionsContainer>
  );
};

export default Actions;
