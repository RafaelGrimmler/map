import Box from '../../../../foundation/Box';
import { StyledActionTitle } from './styles';

type ActionBreadcrumbProps = {
  padding?: string;
  options: Array<{ label: string; onClick?: () => void }>;
};

const ActionBreadcrumb: React.FC<ActionBreadcrumbProps> = ({
  padding = '0px 16px',
  options,
}) => {
  return (
    <Box padding={padding} display="flex" alignItems="center" gap="4px">
      {options.map((option, i) => (
        <>
          {i > 0 && (
            <StyledActionTitle
              key={option?.label + '_separator'}
              onClick={option?.onClick}
              $clickable={Boolean(option?.onClick)}
            >
              {'/'}
            </StyledActionTitle>
          )}
          <StyledActionTitle
            key={option?.label}
            onClick={option?.onClick}
            $clickable={Boolean(option?.onClick)}
          >
            {option?.label}
          </StyledActionTitle>
        </>
      ))}
    </Box>
  );
};

export default ActionBreadcrumb;
