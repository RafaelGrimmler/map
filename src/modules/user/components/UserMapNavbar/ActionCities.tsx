import { useEffect } from 'react';
import Box from '../../../../foundation/Box';
import Button from '../../../../foundation/Button';
import Text from '../../../../foundation/Text';
import { UseCitiesReturn } from '../../helpers/useCities';
import ActionBreadcrumb from './ActionBreadcrumb';
import { StyledActionBaseContainer } from './styles';
import Radio from '../../../../components/Radio';

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

  useEffect(() => {
    if (!city?.id) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const { latitude, longitude } = city;

      const distance = 100; // metros
      const latitudeOffset = distance / 111320;
      const longitudeOffset =
        distance / (111320 * Math.cos((latitude * Math.PI) / 180));

      let newLatitude = latitude;
      let newLongitude = longitude;

      switch (event.key) {
        case 'w':
          newLatitude += latitudeOffset;
          break;

        case 's':
          newLatitude -= latitudeOffset;
          break;

        case 'd':
          newLongitude += longitudeOffset;
          break;

        case 'a':
          newLongitude -= longitudeOffset;
          break;

        default:
          return;
      }

      event.preventDefault();

      cityController?.editCity({
        latitude: newLatitude,
        longitude: newLongitude,
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [city, cityController]);

  const operationOptions = [
    { label: 'Zoom >= 6', value: 6 },
    { label: 'Zoom >= 7', value: 7 },
    { label: 'Zoom >= 8', value: 8 },
    { label: 'Zoom >= 9', value: 9 },
    { label: 'Zoom >= 10', value: 10 },
    { label: 'Zoom >= 11', value: 11 },
    { label: 'Zoom >= 12', value: 12 },
  ];

  return (
    <StyledActionBaseContainer px="16px">
      {city?.id ? (
        <Box display="flex" flexDir="column" gap="8px">
          <Text fontSize="14px">
            Cidade:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {city.name} - {state}
            </span>
          </Text>
          <Text fontSize="12px" lineHeight="12px">
            Utilize as teclas W, A, S e D para mover a cidade no mapa.
          </Text>
          <Radio
            options={operationOptions as any}
            selected={city?.elevation as any}
            onChange={(v: any) => cityController?.editCity({ elevation: v })}
          />
        </Box>
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
