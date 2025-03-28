import Box from '../../../../foundation/Box';
import { StyledImage } from './styles';

const HomeListImage: React.FC = () => {
  const images = [
    'https://i.imgur.com/N6inych_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
    'https://i.imgur.com/qcikNQL_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
    'https://i.imgur.com/ku25xzl_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
    'https://i.imgur.com/wVshMPf_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
  ];

  return (
    <Box display="flex" gap="10">
      {images?.map((image) => <StyledImage key={image} src={image} />)}
    </Box>
  );
};

export default HomeListImage;
