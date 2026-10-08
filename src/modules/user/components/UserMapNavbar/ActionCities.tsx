import { UseCitiesReturn } from '../../helpers/useCities';
import ActionBreadcrumb from './ActionBreadcrumb';
import { StyledActionBaseContainer } from './styles';

type ActionCitiesProps = { cityController: UseCitiesReturn };

const ActionCities: React.FC<ActionCitiesProps> = ({ cityController }) => {
  return (
    <StyledActionBaseContainer>
      <ActionBreadcrumb
        options={[
          { label: 'Menu principal', onClick: cityController?.stop },
          { label: 'Cidades' },
        ]}
      />
    </StyledActionBaseContainer>
  );
};

export default ActionCities;
