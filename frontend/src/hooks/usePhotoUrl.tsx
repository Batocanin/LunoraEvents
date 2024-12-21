import { useEffect } from "react";

const createPhotoUrl = (photo: File | string | null | undefined): string => {
  if (photo instanceof File) {
    return URL.createObjectURL(photo);
  } else if (photo) {
    return `${process.env.NEXT_PUBLIC_S3_URL}/${photo}`;
  }
  return "";
};

function usePhotoUrl(
  photo: File | string | null | undefined,
  setPhotoUrl: (url: string) => void
) {
  useEffect(() => {
    const objectUrl = createPhotoUrl(photo);
    if (objectUrl) {
      setPhotoUrl(objectUrl);
    } else {
      setPhotoUrl("");
    }
    return () => {
      if (photo instanceof File) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [photo, setPhotoUrl]);
}

export default usePhotoUrl;
