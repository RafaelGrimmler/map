import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { UserProfile } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import { downloadFiles } from '../../../../helpers/downloadFiles';

type EditMapProps = { userProfile: UserProfile };

const EditMap: React.FC<EditMapProps> = ({ userProfile }) => {
  const [user, setUser] = useState<UserProfile>(userProfile);

  const [lineId, setLineId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });

  const handleDownload = () => downloadFiles({ user });

  return (
    <StyledContainer>
      <Map
        userProfile={user}
        editLineId={lineId}
        setLineId={setLineId}
        handleAppendLine={lineFunctions?.handleAppendLine}
      />
      <EditSidebar
        userProfile={user}
        lineId={lineId}
        setLineId={setLineId}
        handleDeleteLine={lineFunctions?.handleDeleteLine}
        handleInsertLine={lineFunctions?.handleInsertLine}
        handleUndoLine={lineFunctions?.handleUndoLine}
        handleDownload={handleDownload}
      />
      <Navbar userProfile={userProfile} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
