import isEqual from 'lodash/isEqual';
import { User } from '../types';
import { getTodayFormat } from './useDates';
import { useUsers } from './useUsers';

type DownloadFilesArgs = {
  user: User;
};

const checkIfUserHasChanges = (user: User) => {
  const { users } = useUsers();
  const oldUser = users?.find((e) => e?.userMap === user?.userMap);
  return !isEqual(user, oldUser);
};

const download = (filename: string, data: any) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;

  const link = document.createElement('a');
  link.href = jsonString;
  link.download = filename;
  link.click();
};

export const downloadFiles = ({ user }: DownloadFilesArgs) => {
  const today = getTodayFormat();

  const userData = {
    ...user,
    lines: user?.lines?.filter((e) => e?.lines?.length > 1),
  };

  const userHasChanges = checkIfUserHasChanges(user);

  if (userHasChanges) download(`${user?.userMap}_${today}.json`, userData);
};
