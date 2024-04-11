import { LatLng } from 'leaflet';
import { NavbarOptions } from '../types';
import { useState } from 'react';
import { getTimestamp } from './useDates';
import { NavbarEnum } from '../Enums';
import { DeleteAlertProps } from '../components/DeleteAlert';

export type UseLineReturn = {
  editLine: any;
  handleStartEdit: () => void;
  handleAddCoordinate: (latlng: LatLng) => void;
  handleSaveLine: () => void;
  handleCancelLine: () => void;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleEditExists: (line: any) => void;
};

type UseLine = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  setSelected: React.Dispatch<React.SetStateAction<NavbarOptions>>;
  setAlert: React.Dispatch<React.SetStateAction<Partial<DeleteAlertProps>>>
};

export const useLine = ({ lines, setLines, setSelected, setAlert }: UseLine) => {
  const [editLine, setEditLine] = useState<any>();

  const handleEditExists = (line: any) => {
    setSelected(NavbarEnum.LINE);
    setEditLine(line);
  };

  const getLine = () => editLine;

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
      const line = { id: getTimestamp(), lines: getLine()?.lines };
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
      lines: lines?.filter((_: any, i: any) => i !== lines?.length - 1),
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
