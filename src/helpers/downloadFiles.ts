import isEqual from 'lodash/isEqual';
import { getTodayFormat } from './useDates';

type DownloadFilesArgs = {
  user: any;
};

const checkIfUserHasChanges = (user: any) => {
  const oldUser = []?.find((e) => e?.userMap === user?.userMap);
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
    lines: user?.lines?.filter((e: any) => e?.lines?.length > 1),
  };

  const userHasChanges = checkIfUserHasChanges(user);

  if (userHasChanges) download(`${user?.userMap}_${today}.json`, userData);
};
