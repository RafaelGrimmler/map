/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'react/jsx-runtime';
import { Circle, Polyline as PolylineComponent } from 'react-leaflet';
import { Line } from '../../types';
import { LatLngExpression } from 'leaflet';

type PolylineProps = {
  line: Line;
  isEditing?: boolean;
  handleSelect?: () => void;
};

const Polyline: React.FC<PolylineProps> = ({
  line,
  isEditing,
  handleSelect,
}) => {
  return (
    <Fragment>
      <PolylineComponent
        positions={line?.lines as any}
        className={isEditing ? 'selected polyline' : 'polyline'}
        eventHandlers={{ click: () => !isEditing && handleSelect?.() }}
      />
      {isEditing &&
        line?.lines?.map((e: any, i: any) => (
          <Circle
            key={e?.[0] + i}
            center={e as LatLngExpression}
            radius={1}
            color="#2ecc9d"
            weight={3}
          />
        ))}
    </Fragment>
  );
};

export default Polyline;
