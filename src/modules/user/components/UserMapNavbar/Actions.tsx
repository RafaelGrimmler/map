import { useContext, useState } from 'react';
import { StyledActionsContainer } from './styles';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import ActionOption, { ActionOptionProps } from './ActionOption';
import { TbRouteSquare, TbUpload, TbDownload, TbLogin2 } from 'react-icons/tb';
import ActionLogin from './ActionLogin';
import ActionRoutes from './ActionRoutes';
import { useRoutingReturn } from '../../helpers/useRouting';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';

type ActionsType = {
  userController: UseUserContainerReturn;
  routing: useRoutingReturn;
};

const Actions: React.FC<ActionsType> = ({ userController, routing }) => {
  const loginContext = useContext(LoginContext);

  const [loginEnabled, setLoginEnabled] = useState(false);

  const { isLogged } = loginContext as LoginContextReturn;

  const options: ActionOptionProps[] = isLogged
    ? [
        {
          label: 'Rotas',
          iconComponent: <TbRouteSquare />,
          onClick: () => routing?.start(),
        },
        { label: 'Upload', iconComponent: <TbUpload />, onClick: () => {} },
        {
          label: 'Download',
          iconComponent: <TbDownload />,
          notification: userController?.pendingDownload,
          onClick: () => userController?.downloadMap(),
        },
      ]
    : [
        {
          label: 'Login',
          iconComponent: <TbLogin2 />,
          onClick: () => setLoginEnabled(true),
        },
      ];

  if (loginEnabled)
    return <ActionLogin handleClose={() => setLoginEnabled(false)} />;

  if (routing?.enabled) return <ActionRoutes routing={routing} />;

  return (
    <StyledActionsContainer>
      {options?.map((option) => (
        <ActionOption
          key={option?.label}
          iconComponent={option?.iconComponent}
          label={option?.label}
          notification={option?.notification}
          onClick={option?.onClick}
        />
      ))}
    </StyledActionsContainer>
  );
};

export default Actions;
