import { useMemo } from "react";
import { asImageSrc, ImageField } from "@prismicio/client";

export const useImageSource = (image: ImageField) => {
  return useMemo(
    () => (image ? (asImageSrc(image) ?? undefined) : undefined),
    [image],
  );
};
