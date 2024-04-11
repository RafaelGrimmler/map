import { Circle, Polyline } from 'react-leaflet';
import { Line, NavbarOptions } from '../../types';
import { useTheme } from '@chakra-ui/react';
import { LatLngExpression } from 'leaflet';
import { UseLineReturn } from '../../helpers/useLine';
import { useState, useEffect } from 'react';

type PolylinesProps = {
  lines: Line[];
  upperLineWeight?: number;
  lineProps?: Partial<UseLineReturn>;
  lineWeight?: number;
  selected?: NavbarOptions;
};

const Polylines: React.FC<PolylinesProps> = ({
  lines,
  lineProps,
  upperLineWeight,
  lineWeight,
  selected,
}) => {
  const { colors } = useTheme();
  const [hoverLine, setHoverLine] = useState<Line>();

  const { editLine } = lineProps || {};

  useEffect(() => setHoverLine(undefined), [selected]);

  return (
    <>
      {editLine && (
        <>
          <Polyline
            positions={editLine?.lines}
            pathOptions={{ color: colors.teal[300], weight: upperLineWeight }}
          />
          {editLine?.lines?.map((e: any, i: any) => (
            <Circle
              key={e?.[0] + i}
              center={e as LatLngExpression}
              radius={1}
              color={colors.teal[600]}
              weight={3}
            />
          ))}
        </>
      )}
      {lines
        ?.filter((e) => e?.id !== editLine?.id)
        ?.map((e) => {
          const hovering = hoverLine?.id === e?.id;

          return (
            <Polyline
              key={e?.id}
              positions={e?.lines as any}
              pathOptions={{
                color: hovering ? colors.teal[300] : colors.teal[400],
                weight: hovering ? upperLineWeight : lineWeight,
              }}
              eventHandlers={{
                mouseover: () => setHoverLine(e),
                mouseout: () => setHoverLine(undefined),
                click: () => lineProps?.handleEditExists?.(e),
              }}
            />
          );
        })}
    </>
  );
};

export default Polylines;
