import { TEncodedFile } from "~/components/Admin/types";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function readAsDataURL(file: File): Promise<TEncodedFile> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      return resolve({
        data: fileReader.result,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      });
    };
    fileReader.readAsDataURL(file);
  });
}
