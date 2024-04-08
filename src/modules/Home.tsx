import { Box } from '@chakra-ui/react';
import Map from '../components/Map';
import ProfileCard from '../components/ProfileCard';
import { useUser } from '../helpers/useUser';

const Home: React.FC = () => {
  const { userProfiles } = useUser();

  return (
    <Box>
      <Map />
      <Box
        width="100%"
        height="100%"
        position="absolute"
        bg="rgba(0,0,0,0.7)"
        left="0"
        top="0"
        zIndex="999"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="80px"
      >
        {userProfiles?.map((userProfile) => (
          <ProfileCard key={userProfile?.userMap} userProfile={userProfile} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
