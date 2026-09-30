import { HiMiniTrash } from 'react-icons/hi2';
import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { useRoutingReturn } from '../../helpers/useRouting';

type ActionFreeRouteProps = { routing: useRoutingReturn };

const ActionFreeRoute: React.FC<ActionFreeRouteProps> = ({ routing }) => {
  const lastPoint = routing?.lastRoutePoint;

  return (
    <Box display="flex" flexDir="column" gap="8px">
      <Text fontSize="12px" px="16px">
        Escolha pontos no mapa para formar a rota:
      </Text>
      <Box display="flex" flexDir="column" gap="4px">
        {lastPoint ? (
          <Box display="flex" gap="4px" px="16px" alignItems="center">
            <Text fontSize="12px">Ultimo ponto:</Text>
            <Text fontSize="12px">{`Lat: ${lastPoint?.[0].toFixed(
              5,
            )}, Lng: ${lastPoint?.[1].toFixed(5)}`}</Text>
            <HiMiniTrash
              color="rgb(255, 63, 63)"
              cursor="pointer"
              fontSize="14px"
              onClick={() => routing?.removeLastPointAtRoute()}
            />
          </Box>
        ) : (
          <Text fontSize="12px" px="16px">
            Nenhum ponto registrado ainda!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ActionFreeRoute;
