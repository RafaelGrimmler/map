import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { User } from '../../../../types';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import EditBar from '../EditBar';

type EditMapProps = { user: User };

const EditMap: React.FC<EditMapProps> = ({ user: defaultUser }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const [lineId, setLineId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });

  // const handleDownload = () => downloadFiles({ user });

  return (
    <StyledContainer>
      <Map
        user={user}
        editLineId={lineId}
        setLineId={setLineId}
        handleAppendLine={lineFunctions?.handleAppendLine}
      />
      <EditBar user={user} />
    </StyledContainer>
  );
};

export default EditMap;
