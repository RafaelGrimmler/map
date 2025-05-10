import { Fragment } from 'react/jsx-runtime';
import { Circle, Polyline as PolylineComponent } from 'react-leaflet';
import { Line as LineType } from '../../types';
import { LatLngExpression } from 'leaflet';

type LineProps = { line: LineType };

const Line: React.FC<LineProps> = ({ line }) => {
  const firstLine = line?.lines?.[0];

  return (
    <Fragment>
      <PolylineComponent positions={line?.lines as any} className="line" />
      {line?.lines?.length === 1 && (
        <Circle
          center={firstLine as LatLngExpression}
          radius={1}
          color="#2ecc9d"
          weight={3}
        />
      )}
    </Fragment>
  );
};

export default Line;
