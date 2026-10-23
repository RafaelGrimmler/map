import { Circle, Tooltip } from 'react-leaflet';
import { City } from '../../types';

type CityMarkerProps = {
  city: City;
  radius: number;
  editing?: boolean;
  checked?: boolean;
  permanent?: boolean;
  handleSelect?: (city: City) => void;
};

const CityMaker: React.FC<CityMarkerProps> = ({
  city,
  radius,
  editing,
  checked,
  permanent,
  handleSelect,
}) => {
  return (
    <Circle
      key={city?.name}
      center={[city.latitude, city.longitude]}
      radius={permanent ? radius : radius > 3000 ? 3000 : radius}
      weight={0.5}
      className={`city-circle ${editing ? 'editing' : ''} ${checked ? 'checked' : ''}`}
      eventHandlers={{ click: () => handleSelect?.(city) }}
    >
      <Tooltip
        direction="top"
        opacity={1}
        offset={[0, -2]}
        permanent={permanent}
        className="custom-tooltip"
      >
        {city.name}
      </Tooltip>
    </Circle>
  );
};

export default CityMaker;
