import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react';
import { StyledAccordionButton, StyledAccordionItem } from './styles';
import { GiPathDistance } from 'react-icons/gi';
import { getTimestamp } from '../../../../helpers/useDates';
import { Line } from '../../../../types';

type LineEditorProps = {
  lineId: number;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertLine: (line: Line) => void;
};

const LineEditor: React.FC<LineEditorProps> = ({
  lineId,
  setLineId,
  handleInsertLine,
}) => {
  const handleCreateLine = (): Line => ({ id: getTimestamp(), lines: [] });

  const handleClick = () => {
    if (lineId) setLineId(0);
    else {
      const line = handleCreateLine();
      setLineId(line.id);
      handleInsertLine(line);
    }
  };

  return (
    <Accordion index={lineId ? 0 : 1}>
      <StyledAccordionItem>
        <StyledAccordionButton
          bg={lineId ? '#2ecc9d' : undefined}
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Text fontSize="18px" lineHeight="24px">
              Linha
            </Text>
            <Icon fontSize="20px" as={GiPathDistance} />
          </Box>
        </StyledAccordionButton>
        <AccordionPanel pb={2}>
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontWeight="bold" fontSize="12px">
              O conteúdo é salvo automaticamente!
            </Text>
            <Button>Remover</Button>
            <Button colorScheme="red">Deletar</Button>
          </Box>
        </AccordionPanel>
      </StyledAccordionItem>
    </Accordion>
  );
};

export default LineEditor;
