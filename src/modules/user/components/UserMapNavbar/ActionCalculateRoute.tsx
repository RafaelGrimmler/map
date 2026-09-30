import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { HiMiniTrash } from 'react-icons/hi2';
import { RouteState, useRoutingReturn } from '../../helpers/useRouting';
import Button from '../../../../foundation/Button';
import { getRoute } from '../../../../requests/graphhoper';
import { useGraphhoperToken } from '../../../../requests/useGraphhoperToken';
import { Spinner } from '@chakra-ui/react';

type ActionCalculateRouteProps = { routing: useRoutingReturn };

const ActionCalculateRoute: React.FC<ActionCalculateRouteProps> = ({
  routing,
}) => {
  const { getToken } = useGraphhoperToken();

  return (
    <Box display="flex" flexDir="column" gap="8px">
      <Text fontSize="12px" px="16px">
        Escolha até 5 pontos para calcular a rota:
      </Text>
      <Box display="flex" flexDir="column" gap="4px">
        {routing?.points?.map((point, index) => (
          <Box
            key={index}
            display="flex"
            gap="4px"
            px="16px"
            alignItems="center"
          >
            <Text fontSize="12px">{`Ponto ${index + 1}:`}</Text>
            <Text fontSize="12px">{`Lat: ${point?.lat.toFixed(
              5,
            )}, Lng: ${point?.lng.toFixed(5)}`}</Text>
            <HiMiniTrash
              color="rgb(255, 63, 63)"
              cursor="pointer"
              fontSize="14px"
              onClick={() => routing?.removePoint(index)}
            />
          </Box>
        ))}
      </Box>
      {routing?.points?.length > 1 &&
        !routing?.calculating &&
        !routing?.calculated && (
          <Box px="16px">
            <Box width="130px">
              <Button
                contained
                small
                onClick={() => {
                  routing?.changeRouteState(RouteState.LOADING);
                  getRoute({
                    waypoints: routing?.points,
                    token: getToken(),
                    onCompleted: (path) => routing?.updatePath(path as any),
                  });
                }}
              >
                Calcular
              </Button>
            </Box>
          </Box>
        )}
      {routing?.calculating && (
        <Box px="16px" display="flex" alignItems="center" gap="8px">
          <Spinner color="rgb(255, 174, 0)" />
          <Text fontSize="12px">Procurando rota...</Text>
        </Box>
      )}
      {routing?.calculated && (
        <Box px="16px" display="flex" alignItems="center" gap="8px">
          <Text fontSize="12px" fontWeight="700">
            Rota calculada com sucesso!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ActionCalculateRoute;
