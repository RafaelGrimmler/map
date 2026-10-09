import { Circle, Tooltip } from 'react-leaflet';
import { City } from '../../types';

type CityMarkerProps = {
  city: City;
  editing?: boolean;
  checked?: boolean;
  handleSelect?: (city: City) => void;
};

const CityMaker: React.FC<CityMarkerProps> = ({
  city,
  editing,
  checked,
  handleSelect,
}) => {
  return (
    <Circle
      key={city?.name}
      center={[city.latitude, city.longitude]}
      radius={1000}
      weight={0.5}
      className={`city-circle ${editing ? 'editing' : ''} ${checked ? 'checked' : ''}`}
      eventHandlers={{ click: () => handleSelect?.(city) }}
    >
      <Tooltip
        direction="top"
        opacity={1}
        permanent={city.name === 'Pelotas'}
        className="custom-tooltip"
      >
        {city.name}
      </Tooltip>
    </Circle>
  );
};

export default CityMaker;
