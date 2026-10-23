import { useEffect, useMemo, useState } from 'react';
import Box from '../../../../foundation/Box';
import Button from '../../../../foundation/Button';
import Text from '../../../../foundation/Text';
import { UseCitiesReturn } from '../../helpers/useCities';
import ActionBreadcrumb from './ActionBreadcrumb';
import { StyledActionBaseContainer } from './styles';
import Radio from '../../../../components/Radio';
import orderBy from 'lodash/orderBy';
import Input from '../../../../foundation/Input';
import { IoSettings } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { UseUserContainerReturn } from '../../../../helpers/useUserContainer';
import Switch from '../../../../components/Switch';

type ActionCitiesProps = {
  cityController: UseCitiesReturn;
  userController: UseUserContainerReturn;
};

type ActionCitiesListProps = {
  cityController: UseCitiesReturn;
  userController: UseUserContainerReturn;
};

type ActionCitiesSettingsProps = { cityController: UseCitiesReturn };

const ActionCitiesList: React.FC<ActionCitiesListProps> = ({
  cityController,
  userController,
}) => {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  const cities = useMemo(() => {
    if (!query) return [];

    const c = cityController?.cities?.filter(
      (c) =>
        c?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        c?.state?.abbr?.toLowerCase()?.includes(query?.toLowerCase()),
    );

    return orderBy(c, ['name'], ['asc']);
  }, [cityController?.cities, query]);

  return (
    <StyledActionBaseContainer>
      <ActionBreadcrumb
        options={[
          { label: 'Menu principal', onClick: cityController?.stop },
          { label: 'Cidades' },
        ]}
      />
      <Box px="16px" display="flex" alignItems="center" gap="8px">
        <Box flex={1} pos="relative">
          <Input
            placeholder="Buscar"
            value={text}
            onChange={(e) => setText(e?.target?.value)}
            onBlur={() => setText(text?.trim())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setQuery(text?.trim());
              }
            }}
            style={{ paddingRight: '32px' }}
          />
          <Box
            width="24px"
            height="24px"
            bg="rgb(240, 240, 240)"
            borderRadius="4px"
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            top="4px"
            right="4px"
            zIndex="99"
            sx={{ '&:hover': { backgroundColor: 'rgb(255, 174, 0)' } }}
            onClick={() => setQuery(text?.trim())}
          >
            <BiSearch />
          </Box>
        </Box>
        <Box cursor="pointer" onClick={cityController?.startSettings}>
          <IoSettings color="rgb(255, 174, 0)" />
        </Box>
      </Box>
      <Box display="flex" flexDir="column" maxHeight="220px" overflow="auto">
        {cities?.length > 0 &&
          cities?.map((city, i) => {
            const isLast = i === cities?.length - 1;

            return (
              <Box
                key={city?.id + 'list-option'}
                display="flex"
                alignItems="center"
                gap="8px"
                p="4px 16px 4px 18px"
                justifyContent="space-between"
                borderBottom={isLast ? 'none' : '1px solid rgb(240, 240, 240)'}
                sx={{ '&:hover': { backgroundColor: 'rgb(243, 243, 243)' } }}
              >
                <Box
                  display="flex"
                  flex="1"
                  alignItems="center"
                  gap="4px"
                  overflow="hidden"
                >
                  <Text
                    fontSize="12px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {city?.name}
                  </Text>
                  <Text flexShrink="0" fontSize="12px">
                    - {city?.state?.abbr}
                  </Text>
                </Box>
                <Box display="flex" gap="4px">
                  <Switch
                    checked={cityController?.isVisited(city?.id)}
                    onClick={() => userController?.toggleCity(city?.id)}
                  />
                  <Box
                    width="16px"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => cityController?.selectHighlightedCity(city)}
                  >
                    <FaMapMarkerAlt fontSize="12px" color="rgb(255, 174, 0)" />
                  </Box>
                </Box>
              </Box>
            );
          })}

        {cities?.length === 0 && (
          <Box display="flex" flexDir="column" gap="4px" px="16px" pl="18px">
            <Text fontWeight="700" fontSize="12px">
              Nenhum resultado!
            </Text>
            <Text fontWeight="500" fontSize="10px">
              Utilize a busca para trazer cidades
            </Text>
          </Box>
        )}
      </Box>
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

const ActionCities: React.FC<ActionCitiesProps> = ({
  cityController,
  userController,
}) => {
  return cityController?.settings ? (
    <ActionCitiesSettings cityController={cityController} />
  ) : (
    <ActionCitiesList
      cityController={cityController}
      userController={userController}
    />
  );
};

export default ActionCities;
