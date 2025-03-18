/* eslint-disable @typescript-eslint/no-unused-vars */
import isEqual from 'lodash/isEqual';
import { Image, Marker, UserProfile } from '../types';
import { getTodayFormat } from './useDates';
import { useUser } from './useUser';
import { getImages } from './getImages';
import { getMarkers } from './getMarkers';

type DownloadFilesArgs = {
  user: UserProfile;
  markers: Marker[];
  images: Image[];
};

const checkIfUserHasChanges = (user: UserProfile) => {
  const { userProfiles } = useUser();
  const oldUser = userProfiles?.find((e) => e?.userMap === user?.userMap);
  return !isEqual(user, oldUser);
};

const checkIfImagesHasChanges = (images: Image[]) => {
  const oldImages = getImages();
  return !isEqual(images, oldImages);
};

const checkIfMarkersHasChanges = (markers: Marker[]) => {
  const oldMarkers = getMarkers();
  return !isEqual(markers, oldMarkers);
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

export const downloadFiles = ({ user, images, markers }: DownloadFilesArgs) => {
  const today = getTodayFormat();

  const markerData = { markers: markers?.filter((e) => e?.points?.length > 0) };
  const userData = {
    ...user,
    lines: user?.lines?.filter((e) => e?.lines?.length > 0),
  };

  const userHasChanges = checkIfUserHasChanges(user);
  const markersHasChanges = checkIfMarkersHasChanges(markers);
  const imagesHasChanges = checkIfImagesHasChanges(images);

  if (userHasChanges) download(`${user?.userMap}_${today}.json`, userData);
  if (markersHasChanges) download('markers.json', markerData);
  if (imagesHasChanges) download('images.json', { images });
};
