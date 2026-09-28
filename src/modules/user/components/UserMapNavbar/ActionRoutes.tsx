import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { RouteOperation, useRoutingReturn } from '../../helpers/useRouting';
import { MdOutlineDraw, MdRoute } from 'react-icons/md';
import ActionBreadcrumb from './ActionBreadcrumb';
import ActionOption, { ActionOptionProps } from './ActionOption';
import {
  StyledActionRoutesContainer,
  StyledActionRouteSection,
  StyledActionsContainer,
  StyledActionsOptionsOverlay,
} from './styles';
import Button from '../../../../foundation/Button';
import ActionCalculateRoute from './ActionCalculateRoute';

type ActionRoutesProps = { routing: useRoutingReturn };
type EmptyStateProps = { routing: useRoutingReturn };
type AddRouteProps = { routing: useRoutingReturn };

const EmptyState: React.FC<EmptyStateProps> = ({ routing }) => {
  return (
    <Box px="16px">
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
    </Box>
  );
};

const AddRoute: React.FC<AddRouteProps> = ({ routing }) => {
  const options: ActionOptionProps[] = [
    {
      label: 'Calcular rota',
      iconComponent: <MdRoute />,
      type: RouteOperation.CALCULATE,
      onClick: () => routing?.chooseOperation(RouteOperation.CALCULATE),
    },
    {
      label: 'Seleção livre',
      iconComponent: <MdOutlineDraw />,
      type: RouteOperation.FREE_SELECTION,
      onClick: () => routing?.chooseOperation(RouteOperation.FREE_SELECTION),
    },
  ];

  return (
    <Box display="flex" flexDir="column" gap="8px">
      <Text fontSize="12px" px="16px">
        Escolha como deseja adicionar:
      </Text>
      <StyledActionsContainer>
        {options?.map((option) => (
          <ActionOption
            key={option?.label}
            iconComponent={option?.iconComponent}
            label={option?.label}
            selected={routing?.operation === option?.type}
            disabled={routing?.operation && routing?.operation !== option?.type}
            onClick={option?.onClick}
          />
        ))}
        {routing?.operation && <StyledActionsOptionsOverlay />}
      </StyledActionsContainer>

      {routing?.operation === RouteOperation.CALCULATE && (
        <ActionCalculateRoute routing={routing} />
      )}

      <Box display="flex" gap="8px" px="16px">
        <Button onClick={routing?.reset}>Cancelar</Button>
        <Button contained disabled={true} onClick={() => {}}>
          Aplicar
        </Button>
      </Box>
    </Box>
  );
};

const EditRoute: React.FC = () => {
  return <>test</>;
};

const ActionRoutes: React.FC<ActionRoutesProps> = ({ routing }) => {
  const Component = routing?.route?.id ? EditRoute : AddRoute;

  return (
    <StyledActionRoutesContainer>
      <ActionBreadcrumb
        options={[
          { label: 'Menu principal', onClick: () => routing?.stop() },
          { label: 'Gerenciamento de rotas' },
        ]}
      />
      <StyledActionRouteSection>
        {routing?.route ? (
          <Component routing={routing} />
        ) : (
          <EmptyState routing={routing} />
        )}
      </StyledActionRouteSection>
    </StyledActionRoutesContainer>
  );
};

export default ActionRoutes;
