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

type EditMapProps = { user: User };

const EditMap: React.FC<EditMapProps> = ({ user: defaultUser }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [lineId, setLineId] = useState(0);

  const [routing, setRouting] = useState(false);
  const [waypoints, setWaypoints] = useState<LatLng[]>([]);
  const [routes, setRoutes] = useState<LatLng[][]>([]);
  const [selectedRoute, setSelectedRoute] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });

  console.log(lineFunctions);

  // const handleDownload = () => downloadFiles({ user });

  const handleFindLocation = (coord: LatLng) => {
    if (routing) {
      if (waypoints?.length < 5) setWaypoints([...waypoints, coord]);
    }
  };

  const handleCloseRouting = () => {
    setRouting(false);
    setWaypoints([]);
    setRoutes([]);
    setSelectedRoute(0);
  };

  const navbarItems: NavbarItem[] = [
    {
      icon: <TbRoute />,
      label: 'Rota',
      onClick: () => setRouting(true),
    },
    { icon: <IoAnalyticsOutline />, label: 'Linha', onClick: () => {} },
    { icon: <TbDownload />, label: 'Download', onClick: () => {} },
  ];

  return (
    <StyledContainer>
      <Map
        user={user}
        waypoints={waypoints}
        selectedRoute={selectedRoute}
        disableRoutes={routing}
        routes={routes}
        handleFindLocation={handleFindLocation}
      />
      {user && (
        <Navbar image={user?.image} items={navbarItems} disabled={routing} />
      )}
      {routing && (
        <RoutePanel
          routes={routes}
          selectedRoute={selectedRoute}
          setRoutes={setRoutes}
          setSelectedRoute={setSelectedRoute}
          waypoints={waypoints}
          setWaypoints={setWaypoints}
          onClose={handleCloseRouting}
        />
      )}
    </StyledContainer>
  );
};

export default EditMap;
