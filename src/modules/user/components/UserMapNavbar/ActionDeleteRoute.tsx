import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';

const ActionDeleteRoute: React.FC = () => {
  return (
    <Box display="flex" flexDir="column" gap="8px" px="16px">
      <Text fontSize="12px">
        A rota que será deletada está marcada em{' '}
        <span style={{ fontWeight: 700 }}>VERMELHO</span>
      </Text>
      <Text fontSize="12px" fontWeight="700">
        Você tem certeza que deseja fazer isso?
      </Text>
    </Box>
  );
};

export default ActionDeleteRoute;
