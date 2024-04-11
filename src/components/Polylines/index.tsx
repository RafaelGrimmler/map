import { Circle, Polyline } from 'react-leaflet';
import { Line } from '../../types';
import { useState } from 'react';
import { useTheme } from '@chakra-ui/react';
import { LatLngExpression } from 'leaflet';

type PolylinesProps = {
  lines: Line[];
  editLineId?: number;
  zoom: number;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
};

const Polylines: React.FC<PolylinesProps> = ({
  lines,
  zoom,
  editLineId,
  setLineId,
}) => {
  const { colors } = useTheme();
  const [hoverId, setHoverId] = useState(0);

  const handleSelect = (lineId: number) => {
    if (!editLineId) setLineId?.(lineId);
  };

  const getLineWeight = (constant = 1) => {
    if (zoom <= 7) return 0.7 * constant;
    if (zoom <= 11) return 1 * constant;
    if (zoom <= 13) return 2 * constant;
    if (zoom <= 14) return 1.2 * constant;
    if (zoom <= 16) return 0.8 * constant;
    return 1 * constant;
  };

  const upperWeight = getLineWeight(2);
  const defaultWeight = getLineWeight();

  return (
    <>
      {lines?.map((line) => {
        const isHovering = hoverId === line?.id && !editLineId;

        if (line?.id === editLineId) {
          return (
            <>
              <Polyline
                positions={line?.lines as any}
                pathOptions={{ color: '#2ECC71', weight: upperWeight }}
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
            pathOptions={{
              color: isHovering ? colors.teal[300] : colors.teal[400],
              weight: isHovering ? upperWeight : defaultWeight,
            }}
            eventHandlers={{
              mouseover: () => setHoverId(line?.id),
              mouseout: () => setHoverId(0),
              click: () => handleSelect(line?.id),
            }}
          />
        );
      })}
    </>
  );
};

export default Polylines;
