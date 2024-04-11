import { Accordion, AccordionPanel, Box, Icon, Text } from '@chakra-ui/react';
import { StyledAccordionButton, StyledAccordionItem } from './styles';
import { IconType } from 'react-icons';

type EditAccordionProps = {
  label: string;
  isSelected?: boolean;
  panelComponent?: React.ReactNode;
  handleClick?: () => void;
  icon?: IconType;
};

const EditAccordion: React.FC<EditAccordionProps> = ({
  label,
  isSelected,
  panelComponent,
  handleClick,
  icon,
}) => {
  return (
    <Accordion index={isSelected ? 0 : 1}>
      <StyledAccordionItem>
        <StyledAccordionButton
          bg={isSelected ? '#2ecc9d' : undefined}
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Text fontSize="18px" lineHeight="24px">
              {label}
            </Text>
            {icon && <Icon fontSize="20px" as={icon} />}
          </Box>
        </StyledAccordionButton>
        <AccordionPanel pb={2}>{panelComponent}</AccordionPanel>
      </StyledAccordionItem>
    </Accordion>
  );
};

export default EditAccordion;
