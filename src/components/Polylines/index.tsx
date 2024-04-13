import { Circle, Polyline } from 'react-leaflet';
import { Line, Marker } from '../../types';
import { LatLngExpression } from 'leaflet';

type PolylinesProps = {
  lines: Line[];
  marker: Marker;
  editLineId?: number;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
};

const Polylines: React.FC<PolylinesProps> = ({
  lines,
  marker,
  editLineId,
  setLineId,
  setMarkerId,
}) => {
  const handleSelect = (lineId: number) => {
    const hasPoints = marker?.points?.length > 0;
    if (hasPoints) setMarkerId?.(0);
    if (!editLineId && hasPoints) setLineId?.(lineId);
  };

  return (
    <>
      {lines?.map((line) => {
        if (line?.id === editLineId) {
          return (
            <>
              <Polyline
                positions={line?.lines as any}
                className="selected polyline"
              />
              {line?.lines?.map((e: any, i: any) => (
                <Circle
                  key={e?.[0] + i}
                  center={e as LatLngExpression}
                  radius={1}
                  color="#2ecc9d"
                  weight={3}
                />
              ))}
            </>
          );
        }

        return (
          <Polyline
            key={line?.id}
            positions={line?.lines as any}
            className="polyline"
            eventHandlers={{
              click: () => handleSelect(line?.id),
            }}
          />
        );
      })}
    </>
  );
};

export default Polylines;
