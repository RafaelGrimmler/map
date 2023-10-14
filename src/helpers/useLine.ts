import { LatLng } from 'leaflet';
import { Line, NavbarOptions } from '../types';
import { useState } from 'react';
import { getTimestamp } from './useDates';
import { NavbarEnum } from '../Enums';
import { DeleteAlertProps } from '../components/DeleteAlert';

export type UseLineReturn = {
  editLine: Line;
  handleStartEdit: () => void;
  handleAddCoordinate: (latlng: LatLng) => void;
  handleSaveLine: () => void;
  handleCancelLine: () => void;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleEditExists: (line: Line) => void;
};

type UseLine = {
  lines: Line[];
  setLines: React.Dispatch<React.SetStateAction<Line[]>>;
  setSelected: React.Dispatch<React.SetStateAction<NavbarOptions>>;
  setAlert: React.Dispatch<React.SetStateAction<Partial<DeleteAlertProps>>>
};

export const useLine = ({ lines, setLines, setSelected, setAlert }: UseLine) => {
  const [editLine, setEditLine] = useState<Line>();

  const handleEditExists = (line: Line) => {
    setSelected(NavbarEnum.LINE);
    setEditLine(line);
  };

  const getLine = () => editLine as Line;

  const handleClose = () => {
    setEditLine(undefined);
    setSelected(undefined);
  };

  const handleStartEdit = () => setEditLine({ id: undefined, lines: [] });

  const handleAddCoordinate = (latlng: LatLng) => {
    const { lat, lng } = latlng || {};
    const previousLines = editLine?.lines || [];
    const coordinates = [...previousLines, [lat, lng]];
    setEditLine({ ...getLine(), lines: coordinates });
  };

  const handleSaveLine = () => {
    const alreadyAdded = !!lines?.find((e) => e?.id === editLine?.id);

    if (!alreadyAdded) {
      const line: Line = { id: getTimestamp(), lines: getLine()?.lines };
      setLines((prev) => [...prev, line]);
    } else {
      const linesWithoutEdited = lines?.filter((e) => e?.id !== editLine?.id);
      setLines([...linesWithoutEdited, getLine()]);
    }

    handleClose();
  };

  const handleUndoLine = () => {
    const { id, lines } = editLine || {};

    setEditLine({
      id,
      lines: lines?.filter((_, i) => i !== lines?.length - 1) as any,
    });
  };

  const handleCancelLine = () => handleClose();

  const handleConfirmDelete = () => {
    setLines((lines) => lines?.filter((e) => e?.id !== editLine?.id));
    handleClose();
  }

  const handleDeleteLine = () => {
    setAlert({ open: true, onConfirm: handleConfirmDelete })
  };

  return {
    editLine,
    handleStartEdit,
    handleAddCoordinate,
    handleSaveLine,
    handleCancelLine,
    handleUndoLine,
    handleDeleteLine,
    handleEditExists,
  };
};
