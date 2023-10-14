import { UseLineReturn } from '../../helpers/useLine';
import ButtonsComponent from './ButtonsComponent';

type LineComponentProps = {
  lineProps: Partial<UseLineReturn>;
};

const LineComponent: React.FC<LineComponentProps> = ({ lineProps }) => {
  const {
    editLine,
    handleUndoLine,
    handleSaveLine,
    handleCancelLine,
    handleDeleteLine,
  } = lineProps;

  const disableUndo = editLine?.lines?.length === 0;
  const disableSave = (editLine?.lines?.length as number) < 2;
  const disableDelete = editLine?.id === undefined;

  return (
    <ButtonsComponent
      undoProps={{ onClick: handleUndoLine, disabled: disableUndo }}
      saveProps={{ onClick: handleSaveLine, disabled: disableSave }}
      cancelProps={{ onClick: handleCancelLine }}
      deleteProps={{ onClick: handleDeleteLine, disabled: disableDelete }}
    />
  );
};

export default LineComponent;
