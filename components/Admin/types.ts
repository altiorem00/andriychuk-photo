import { TEncodedGalleryImage } from "~/firebase/types";

export type TEncodedFile = {
  data: TEncodedGalleryImage;
  name: string;
  size: number;
  type: string;
  file: File;
};
