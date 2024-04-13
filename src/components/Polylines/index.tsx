import { Circle, Polyline } from 'react-leaflet';
import { Line } from '../../types';
import { LatLngExpression } from 'leaflet';

type PolylinesProps = {
  lines: Line[];
  editLineId?: number;
  zoom: number;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
};

const Polylines: React.FC<PolylinesProps> = ({
  lines,
  zoom,
  editLineId,
  setLineId,
  setMarkerId,
}) => {
  const handleSelect = (lineId: number) => {
    setMarkerId?.(0);
    if (!editLineId) setLineId?.(lineId);
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
