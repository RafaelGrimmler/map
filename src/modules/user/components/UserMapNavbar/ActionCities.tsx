import Box from '../../../../foundation/Box';
import Button from '../../../../foundation/Button';
import Text from '../../../../foundation/Text';
import { UseCitiesReturn } from '../../helpers/useCities';
import ActionBreadcrumb from './ActionBreadcrumb';
import { StyledActionBaseContainer } from './styles';

type ActionCitiesProps = { cityController: UseCitiesReturn };
type ActionCitiesListProps = { cityController: UseCitiesReturn };
type ActionCitiesSettingsProps = { cityController: UseCitiesReturn };

const ActionCitiesList: React.FC<ActionCitiesListProps> = ({
  cityController,
}) => {
  return (
    <StyledActionBaseContainer>
      <ActionBreadcrumb
        options={[
          { label: 'Menu principal', onClick: cityController?.stop },
          { label: 'Cidades' },
        ]}
      />
      <Text onClick={cityController?.startSettings}>Configurar cidades</Text>
    </StyledActionBaseContainer>
  );
};

const ActionCitiesSettings: React.FC<ActionCitiesSettingsProps> = ({
  cityController,
}) => {
  const city = cityController?.city;
  const state = city?.state?.abbr;

  return (
    <StyledActionBaseContainer px="16px">
      {city?.id ? (
        <Text fontSize="14px">
          Cidade:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {city?.name} - {state}
          </span>
        </Text>
      ) : (
        <Box display="flex" flexDir="column" gap="4px">
          <Text fontSize="14px" fontWeight="bold">
            Nenhuma cidade selecionada!
          </Text>
          <Text fontSize="12px" lineHeight="12px">
            Escolha a cidade que deseja editar.
          </Text>
        </Box>
      )}
      <Button contained onClick={() => cityController?.saveSettings()}>
        Salvar e voltar
      </Button>
    </StyledActionBaseContainer>
  );
};

const ActionCities: React.FC<ActionCitiesProps> = ({ cityController }) => {
  return cityController?.settings ? (
    <ActionCitiesSettings cityController={cityController} />
  ) : (
    <ActionCitiesList cityController={cityController} />
  );
};

export default ActionCities;
