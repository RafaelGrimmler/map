import { getTimestamp } from '../../../helpers/useDates';
import { Image } from '../../../types';

type UseEditImageArgs = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

const useEditImage = ({ images, setImages }: UseEditImageArgs) => {
  const handleInsertImage = (src: string) => {
    const newImage: Image = {
      createdAt: new Date(),
      id: getTimestamp(),
      src,
    };

    setImages([...images, newImage]);
  };

  return { handleInsertImage };
};

export default useEditImage;
