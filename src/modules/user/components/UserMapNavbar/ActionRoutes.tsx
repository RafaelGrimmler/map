import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { useRoutingReturn } from '../../helpers/useRouting';
import ActionBreadcrumb from './ActionBreadcrumb';
import {
  StyledActionRoutesContainer,
  StyledActionRouteSection,
} from './styles';

type ActionRoutesProps = {
  routing: useRoutingReturn;
};

const EmptyState: React.FC = () => {
  return (
    <Box
      border="1px dashed rgba(0,0,0,0.08)"
      borderRadius="4px"
      padding="8px"
      display="flex"
      flexDirection="column"
      gap="8px"
    >
      <Text fontSize="14px" fontWeight="700">
        Você escolhe:
      </Text>
      <Box display="flex" flexDirection="column" gap="2px">
        <Text fontSize="12px" fontWeight="700">
          Adicionar rota
        </Text>
        <Text fontSize="10px">Escolha o ponto de partida da rota</Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="2px">
        <Text fontSize="12px" fontWeight="700">
          Editar rota
        </Text>
        <Text fontSize="10px">
          Escolha uma rota já existente para gerencia-la
        </Text>
      </Box>
    </Box>
  );
};

const AddRoute: React.FC = () => {
  return <>dadsa</>;
};

const EditRoute: React.FC = () => {
  return <>test</>;
};

const ActionRoutes: React.FC<ActionRoutesProps> = ({ routing }) => {
  const Component = routing?.route?.id ? EditRoute : AddRoute;

  console.log(routing);

  return (
    <StyledActionRoutesContainer>
      <ActionBreadcrumb
        options={[
          {
            label: 'Menu principal',
            onClick: () => routing?.stop(),
          },
          { label: 'Gerenciamento de rotas' },
        ]}
      />
      <StyledActionRouteSection>
        {routing?.route ? <Component /> : <EmptyState />}
      </StyledActionRouteSection>
    </StyledActionRoutesContainer>
  );
};

export default ActionRoutes;
