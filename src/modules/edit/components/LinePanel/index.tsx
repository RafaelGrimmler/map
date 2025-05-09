import Box from '../../../../foundation/Box';
import IconButton from '../../../../foundation/IconButton';
import Text from '../../../../foundation/Text';
import { StyledContainer } from './styles';
import { MdClose } from 'react-icons/md';

export type LinePanelProps = {
  onClose: () => void;
};

const LinePanel: React.FC<LinePanelProps> = ({ onClose }) => {
  return (
    <StyledContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="500">Editor de linhas</Text>
        <IconButton size="xs" onClick={onClose}>
          <MdClose />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center">
        <Text fontSize="12px" color="textSecondary">
          Selecione pontos clicando no mapa
        </Text>
      </Box>

      {/* <Button
        disabled={routes?.length === 0}
        onClick={() => {
          onSave(routes?.[selectedRoute]);
          onClose();
        }}
      >
        Salvar
      </Button> */}
    </StyledContainer>
  );
};

export default LinePanel;
