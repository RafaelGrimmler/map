import { Box } from '@chakra-ui/react';
import EditAccordion from '../EditAccordion';
import { PiMapPinLineThin } from 'react-icons/pi';

const MarkEditor: React.FC = () => {
  return (
    <Box>
      <EditAccordion label="Marcador" icon={PiMapPinLineThin} />
    </Box>
  );
};

export default MarkEditor;
