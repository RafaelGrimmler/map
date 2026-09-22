import { LatLng } from 'leaflet';
import { getTimestamp } from '../../../helpers/useDates';

type UseEditLineArgs = {
  user: any;
  selectedLine: number;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setSelectedLine: React.Dispatch<React.SetStateAction<number>>;
};

const useEditLine = ({
  selectedLine,
  user,
  setUser,
  setSelectedLine,
}: UseEditLineArgs) => {
  const getNewLine = (lines: number[][] = []): any => ({
    id: getTimestamp(),
    lines,
  });

  const getLine = (id: number) => user?.lines?.find((e: any) => e?.id === id);

  const handleInsertRoute = (coordinates: LatLng[]) => {
    const line = getNewLine(coordinates?.map((c) => [c?.lat, c?.lng]));
    setUser({ ...user, lines: [...user?.lines, line] });
  };

  const handleInsertLine = () => {
    const line = getNewLine();
    setUser({ ...user, lines: [...user?.lines, line] });
    return line;
  };

  const handleAppendLine = (coord: LatLng) => {
    const { lat, lng } = coord || {};

    const lines = user?.lines?.map((line: any) => {
      if (line?.id === selectedLine) {
        return { id: selectedLine, lines: [...line?.lines, [lat, lng]] };
      }

      return line;
    });

    setUser({ ...user, lines });
  };

  const handleUndoLine = () => {
    const lines = user?.lines?.map((line: any) => {
      if (line?.id === selectedLine) {
        return {
          id: selectedLine,
          lines: line?.lines?.filter((_: any, i: any) => i !== line?.lines?.length - 1),
        };
      }

      return line;
    });

    setUser({ ...user, lines });
  };

  const handleDeleteLine = () => {
    const lines = user?.lines?.filter((line: any) => line?.id !== selectedLine);
    setUser({ ...user, lines });
    setSelectedLine(0);
  };

  return {
    handleInsertLine,
    handleAppendLine,
    handleUndoLine,
    handleDeleteLine,
    handleInsertRoute,
    getLine,
  };
};

export default useEditLine;
