import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { User } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import { downloadFiles } from '../../../../helpers/downloadFiles';

type EditMapProps = { user: User };

const EditMap: React.FC<EditMapProps> = ({ user: defaultUser }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const [lineId, setLineId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });

  const handleDownload = () => downloadFiles({ user });

  return (
    <StyledContainer>
      <Map
        user={user}
        editLineId={lineId}
        setLineId={setLineId}
        handleAppendLine={lineFunctions?.handleAppendLine}
      />
      <EditSidebar
        user={user}
        lineId={lineId}
        setLineId={setLineId}
        handleDeleteLine={lineFunctions?.handleDeleteLine}
        handleInsertLine={lineFunctions?.handleInsertLine}
        handleUndoLine={lineFunctions?.handleUndoLine}
        handleDownload={handleDownload}
      />
      <Navbar user={user} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
