import { Fragment } from 'react';
import Switch from '../../../../components/Switch';
import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { UseCitiesReturn } from '../../helpers/useCities';
import { StyledViewContainer } from './styles';

type ViewProps = {
  cityController: UseCitiesReturn;
};

const View: React.FC<ViewProps> = ({ cityController }) => {
  return (
    <StyledViewContainer>
      <Text fontSize="14px" fontWeight="700">
        Visualização
      </Text>
      <Box display="flex" alignItems="center" gap="4px">
        <Text fontSize="12px" lineHeight="16px">
          Cidades
        </Text>
        <Switch
          checked={cityController?.view?.enabled}
          onClick={() => cityController?.toggleView('enabled')}
        />
        {cityController?.view?.enabled && (
          <Fragment>
            -
            <Text fontSize="12px" lineHeight="16px">
              Todas
            </Text>
            <Switch
              checked={cityController?.view?.all}
              onClick={() => cityController?.toggleView('all')}
            />
            -
            <Text fontSize="12px" lineHeight="16px">
              Nomes
            </Text>
            <Switch
              checked={cityController?.view?.names}
              onClick={() => cityController?.toggleView('names')}
            />
          </Fragment>
        )}
      </Box>
    </StyledViewContainer>
  );
};

export default View;
