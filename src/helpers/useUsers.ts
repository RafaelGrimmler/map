import { User } from '../types';

export const useUsers = () => {
  const userIds = ['map_rafael', 'map_erik'];

  const handleLoadUserProfiles = () => {
    return userIds?.map((userId) => require(`../files/maps/${userId}.json`));
  };

  const users: User[] = handleLoadUserProfiles();

  return { users };
};
