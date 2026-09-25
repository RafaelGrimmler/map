import { useContext, useState } from 'react';
import { User } from '../../../../types';
import { StyledActionsContainer } from './styles';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import ActionOption, { ActionOptionProps } from './ActionOption';
import { TbRouteSquare, TbUpload, TbDownload, TbLogin2 } from 'react-icons/tb';
import ActionLogin from './ActionLogin';
import ActionRoutes from './ActionRoutes';
import { useRoutingReturn } from '../../helpers/useRouting';

type ActionsType = {
  user: User;
  routing: useRoutingReturn;
};

const Actions: React.FC<ActionsType> = ({ user, routing }) => {
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
        { label: 'Download', iconComponent: <TbDownload />, onClick: () => {} },
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
          onClick={option?.onClick}
        />
      ))}
    </StyledActionsContainer>
  );
};

export default Actions;
