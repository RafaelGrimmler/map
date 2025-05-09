import L, { LatLng } from 'leaflet';
import Box from '../../../../foundation/Box';
import IconButton from '../../../../foundation/IconButton';
import Text from '../../../../foundation/Text';
import { StyledContainer, StyledLoadingContainer, StyledRoute } from './styles';
import { MdClose } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Button from '../../../../foundation/Button';
import { Spinner } from '@chakra-ui/react';

export type RoutePanelProps = {
  waypoints: LatLng[];
  routes: LatLng[][];
  selectedRoute: number;
  onClose: () => void;
  setWaypoints: (e: LatLng[]) => void;
  setRoutes: (e: LatLng[][]) => void;
  setSelectedRoute: (e: number) => void;
  onSave: (coordinates: LatLng[]) => void;
};

const RoutePanel: React.FC<RoutePanelProps> = ({
  waypoints,
  routes,
  selectedRoute,
  onClose,
  setWaypoints,
  setRoutes,
  setSelectedRoute,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedRoute(0);
    if (waypoints?.length > 1) {
      const coordinates = waypoints?.map((waypoint) =>
        L.latLng(waypoint?.lat, waypoint?.lng),
      );

      const router = (L as any).Routing.control({ waypoints: coordinates });
      router.route(coordinates);
      setLoading(true);

      console.log(router);

      router.on('routesfound', function (e: any) {
        const routes = e.routes;
        setRoutes(routes?.map((r: any) => r.coordinates));
        setLoading(false);
      });
    } else {
      setLoading(false);
      setRoutes([]);
    }
  }, [waypoints]);

  return (
    <StyledContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="500">Criador de rotas</Text>
        <IconButton size="xs" onClick={onClose}>
          <MdClose />
        </IconButton>
      </Box>
      {waypoints?.length > 0 && (
        <Box display="flex" flexDir="column" gap="8px">
          {waypoints?.map((waypoint, i) => (
            <Box
              key={`waypoint-panel-${i}`}
              display="flex"
              gap="8px"
              alignItems="center"
            >
              <Text>Ponto {i + 1} -</Text>
              <Box display="flex" gap="4px" alignItems="center">
                <Text fontWeight="500">Lat:</Text>
                <Text fontSize="14px">{waypoint?.lat.toFixed(2)}</Text>
              </Box>
              <Box display="flex" gap="4px" alignItems="center">
                <Text fontWeight="500">Lng:</Text>
                <Text fontSize="14px">{waypoint?.lng.toFixed(2)}</Text>
              </Box>
              <IconButton
                size="xs"
                onClick={() =>
                  setWaypoints(waypoints?.filter((_, index) => index !== i))
                }
              >
                <IoTrashOutline />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <Box display="flex" justifyContent="center">
        <Text fontSize="12px" color="textSecondary">
          {waypoints?.length === 5
            ? 'Número máximo de pontos atingido'
            : 'Selecione pontos clicando no mapa'}
        </Text>
      </Box>
      {loading && (
        <StyledLoadingContainer>
          <Spinner />
          <Text fontWeight="500" fontSize="14px">
            Procurando rotas
          </Text>
        </StyledLoadingContainer>
      )}
      {!loading && routes?.length > 0 && (
        <Box display="flex" flexDir="column" gap="8px">
          {routes?.map((_, i) => (
            <StyledRoute
              key={`panel-routes-${i}`}
              $selected={selectedRoute === i}
              onClick={() => setSelectedRoute(i)}
            >
              <Text fontWeight="500">Rota {i + 1}</Text>
            </StyledRoute>
          ))}
        </Box>
      )}
      <Button
        disabled={routes?.length === 0}
        onClick={() => {
          onSave(routes?.[selectedRoute]);
          onClose();
        }}
      >
        Salvar
      </Button>
    </StyledContainer>
  );
};

export default RoutePanel;
