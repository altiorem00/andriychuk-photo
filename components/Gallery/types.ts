import { DocumentData } from "@firebase/firestore-types";

export type TGalleryImage = {
  id: number;
  order: number;
  file: ArrayBuffer;
};
export type TGallery = Array<TGalleryImage | DocumentData>;
