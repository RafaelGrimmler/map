import { LatLng } from 'leaflet';
import { Line, NavbarOptions } from '../types';
import { useState } from 'react';
import { getTimestamp } from './getTimestamp';
import { NavbarEnum } from '../Enums';

export type UseEditLineReturn = {
  editLine: Line, 
  handleAddCoordinate: (latlng: LatLng) => void,
  handleAddLine: () => void,
  handleSaveLine: () => void,
  handleCancelLine: () => void,
  handleUndoLine: () => void,
  handleDeleteLine: () => void,
}

export const useEditLine = (
  setLines: React.Dispatch<React.SetStateAction<Line[]>>, 
  setSelected: React.Dispatch<React.SetStateAction<NavbarOptions>>
) => {
  const [editLine, setEditLine] = useState<Line>();

  const handleEditExists = (line: Line) => {
    setSelected(NavbarEnum.LINE);
    setEditLine(line)
  }

  const handleClose = () => {
    setEditLine(undefined);
    setSelected(undefined);
  }

  const handleAddCoordinate = (latlng: LatLng) => {
    const { lat, lng } = latlng || {};
    const previousLines = editLine?.lines || []
    const coordinates = [...previousLines, [lat, lng]];
    setEditLine({ id: editLine?.id, lines: coordinates });
  }

  const handleAddLine = () => {
    const newLine: Line = { id: getTimestamp(), lines: [] };
    setEditLine(newLine);
    setLines((lines) => [...lines, newLine]);
  };

  const handleSaveLine = () => {
    setLines((lines) => {
      return lines?.map((e) => {
        if (e?.id === editLine?.id) return editLine as Line;
        return e;
      })
    });
    handleClose();
  };

  const handleUndoLine = () => {
    const { id, lines } = editLine || {};

    setEditLine({
      id, 
      lines: lines?.filter((e, i) => i !== lines?.length - 1) as any
    });
  }

  const handleCancelLine = () => handleClose();
  

  const handleDeleteLine = () => {
    setLines((lines) => lines?.filter(e => e?.id !== editLine?.id));
    handleClose();
  }

  return {
    editLine, 
    handleAddCoordinate,
    handleAddLine,
    handleSaveLine,
    handleCancelLine,
    handleUndoLine,
    handleDeleteLine,
    handleEditExists,
  }
};
