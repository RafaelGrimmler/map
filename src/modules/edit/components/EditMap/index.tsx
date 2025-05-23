import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { User } from '../../../../types';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import Navbar, { NavbarItem } from '../../../../components/Navbar';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { TbRoute, TbDownload } from 'react-icons/tb';
import RoutePanel from '../RoutePanel';
import { LatLng } from 'leaflet';
import LinePanel from '../LinePanel';
import { downloadFiles } from '../../../../helpers/downloadFiles';
import { useGraphhoperToken } from '../../helpers/useGraphhoperToken';

type Panel = 'ROUTING' | 'LINE';
type EditMapProps = { user: User };

const EditMap: React.FC<EditMapProps> = ({ user: defaultUser }) => {
  const { getToken } = useGraphhoperToken();

  const [user, setUser] = useState<User>(defaultUser);
  const [panel, setPanel] = useState<Panel>();

  // line states
  const [selectedLine, setSelectedLine] = useState(0);

  // routing states
  const [waypoints, setWaypoints] = useState<LatLng[]>([]);
  const [routes, setRoutes] = useState<LatLng[][]>([]);
  const [selectedRoute, setSelectedRoute] = useState(0);

  const {
    handleInsertRoute,
    handleInsertLine,
    handleAppendLine,
    handleDeleteLine,
    handleUndoLine,
  } = useEditLine({ user, selectedLine, setUser, setSelectedLine });

  const handleDownload = () => downloadFiles({ user });

  const handleFindLocation = (coord: LatLng) => {
    if (panel === 'ROUTING') {
      if (waypoints?.length < 5) {
        setWaypoints([...waypoints, coord]);
        setRoutes([]);
      }
    } else if (panel === 'LINE') {
      handleAppendLine(coord);
    }
  };

  const handleCloseRouting = () => {
    setPanel(undefined);
    setWaypoints([]);
    setRoutes([]);
    setSelectedRoute(0);
  };

  const handleCloseLinePanel = () => {
    setPanel(undefined);
    setSelectedLine(0);
  };

  const handleSelectLine = (id: number) => {
    setSelectedLine(id);
    setPanel('LINE');
  };

  const handleOpenLinePanel = () => {
    const line = handleInsertLine();
    setSelectedLine(line?.id);
    setPanel('LINE');
  };

  const handleSetRoute = (e: LatLng[][]) => {
    if (panel === 'ROUTING') setRoutes(e);
  };

  const navbarItems: NavbarItem[] = [
    {
      icon: <TbRoute />,
      label: 'Rota',
      onClick: () => setPanel('ROUTING'),
    },
    {
      icon: <IoAnalyticsOutline />,
      label: 'Linha',
      onClick: handleOpenLinePanel,
    },
    { icon: <TbDownload />, label: 'Download', onClick: handleDownload },
  ];

  return (
    <StyledContainer>
      <Map
        user={user}
        waypoints={waypoints}
        selectedRoute={selectedRoute}
        disableRoutes={!!panel}
        selectedLine={selectedLine}
        routes={routes}
        handleFindLocation={handleFindLocation}
        handleSelectLine={handleSelectLine}
      />
      {user && (
        <Navbar image={user?.image} items={navbarItems} disabled={!!panel} />
      )}
      {panel === 'ROUTING' && (
        <RoutePanel
          routes={routes}
          selectedRoute={selectedRoute}
          setRoutes={handleSetRoute}
          setSelectedRoute={setSelectedRoute}
          waypoints={waypoints}
          setWaypoints={setWaypoints}
          onClose={handleCloseRouting}
          onSave={handleInsertRoute}
          getToken={getToken}
        />
      )}
      {panel === 'LINE' && (
        <LinePanel
          onClose={handleCloseLinePanel}
          handleUndoLine={handleUndoLine}
          handleDeleteLine={handleDeleteLine}
        />
      )}
    </StyledContainer>
  );
};

export default EditMap;
