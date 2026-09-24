import Box from '../../foundation/Box';

type DividerProps = { vertical?: boolean };

const Divider: React.FC<DividerProps> = ({ vertical }) => {
  return (
    <Box
      width={vertical ? '1px' : '100%'}
      height={vertical ? '100%' : '1px'}
      bg="rgba(0,0,0,0.08)"
    />
  );
};

export default Divider;
