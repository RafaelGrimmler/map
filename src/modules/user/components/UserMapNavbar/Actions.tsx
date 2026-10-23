import { useContext, useRef, useState } from 'react';
import { StyledActionsContainer } from './styles';
import { LoginContext, LoginContextReturn } from '../../../../context/Login';
import ActionOption, { ActionOptionProps } from './ActionOption';
import { TbUpload, TbDownload, TbLogin2 } from 'react-icons/tb';
import { LiaCitySolid } from 'react-icons/lia';
import { IoAnalyticsOutline } from 'react-icons/io5';
import ActionLogin from './ActionLogin';
import ActionRoutes from './ActionRoutes';
import { useRoutingReturn } from '../../helpers/useRouting';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';
import { UseCitiesReturn } from '../../helpers/useCities';
import ActionCities from './ActionCities';

type ActionsType = {
  userController: UseUserContainerReturn;
  routing: useRoutingReturn;
  cityController: UseCitiesReturn;
};

const Actions: React.FC<ActionsType> = ({
  userController,
  routing,
  cityController,
}) => {
  const loginContext = useContext(LoginContext);

  const [loginEnabled, setLoginEnabled] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLogged } = loginContext as LoginContextReturn;

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = JSON.parse(event.target?.result as string);
      console.log(event, data);

      userController.uploadMap(data);
    };

    reader.readAsText(file);

    event.target.value = '';
  };

  const options: ActionOptionProps[] = isLogged
    ? [
        {
          label: 'Rotas',
          iconComponent: <IoAnalyticsOutline />,
          onClick: () => routing?.start(),
        },
        {
          label: 'Cidades',
          iconComponent: <LiaCitySolid />,
          onClick: () => cityController.start(),
        },
        {
          label: 'Upload',
          iconComponent: <TbUpload />,
          onClick: handleUpload,
        },
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

  if (cityController?.enabled)
    return (
      <ActionCities
        cityController={cityController}
        userController={userController}
      />
    );

  if (routing?.enabled) return <ActionRoutes routing={routing} />;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

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
    </>
  );
};

export default Actions;
