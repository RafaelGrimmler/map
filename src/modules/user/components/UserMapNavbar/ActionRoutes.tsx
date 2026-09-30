import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import {
  OperationAction,
  RouteOperation,
  useRoutingReturn,
} from '../../helpers/useRouting';
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
import Radio, { RadioOption } from '../../../../components/Radio';
import { useState } from 'react';
import ActionFreeRoute from './ActionFreeRoute';

type ActionRoutesProps = { routing: useRoutingReturn };
type EmptyStateProps = { routing: useRoutingReturn };
type AddRouteProps = { routing: useRoutingReturn };

const EmptyState: React.FC<EmptyStateProps> = ({ routing }) => {
  const [value, setValue] = useState(RouteOperation.ADD as string);

  const options: RadioOption[] = [
    {
      value: RouteOperation.ADD,
      label: 'Adicionar rota',
      description: 'Escolha o ponto de partida da rota',
    },
    {
      value: RouteOperation.EDIT,
      label: 'Editar rota',
      description: 'Escolha uma rota já existente para gerencia-la',
    },
  ];

  return (
    <Box px="16px" display="flex" flexDir="column" gap="8px">
      <Box
        border="1px dashed rgba(0,0,0,0.08)"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="14px" fontWeight="700" pt="8px" px="8px">
          Você escolhe:
        </Text>
        <Radio options={options} selected={value} onChange={setValue} />
      </Box>
      <Box display="flex" gap="8px">
        <Button onClick={routing?.stop}>Voltar</Button>
        <Button
          contained
          onClick={() => routing?.chooseOperation(value as RouteOperation)}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
};

const AddRoute: React.FC<AddRouteProps> = ({ routing }) => {
  const options: ActionOptionProps[] = [
    {
      label: 'Calcular rota',
      iconComponent: <MdRoute />,
      type: OperationAction.CALCULATE,
      onClick: () => routing?.chooseAction(OperationAction.CALCULATE),
    },
    {
      label: 'Seleção livre',
      iconComponent: <MdOutlineDraw />,
      type: OperationAction.FREE,
      onClick: () => routing?.chooseAction(OperationAction.FREE),
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
            selected={routing?.action === option?.type}
            disabled={routing?.action && routing?.action !== option?.type}
            onClick={option?.onClick}
          />
        ))}
        {routing?.action && <StyledActionsOptionsOverlay />}
      </StyledActionsContainer>

      {routing?.action === OperationAction.CALCULATE && (
        <ActionCalculateRoute routing={routing} />
      )}

      {routing?.action === OperationAction.FREE && (
        <ActionFreeRoute routing={routing} />
      )}

      <Box display="flex" gap="8px" px="16px">
        <Button onClick={routing?.reset}>Cancelar</Button>
        <Button
          contained
          disabled={!routing?.validate()}
          onClick={() => routing?.applyChanges()}
        >
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
  const Component =
    routing?.operation === RouteOperation.EDIT ? EditRoute : AddRoute;

  return (
    <StyledActionRoutesContainer>
      <ActionBreadcrumb
        options={[
          { label: 'Menu principal', onClick: routing?.stop },
          { label: 'Gerenciamento de rotas' },
        ]}
      />
      <StyledActionRouteSection>
        {routing?.operation ? (
          <Component routing={routing} />
        ) : (
          <EmptyState routing={routing} />
        )}
      </StyledActionRouteSection>
    </StyledActionRoutesContainer>
  );
};

export default ActionRoutes;
