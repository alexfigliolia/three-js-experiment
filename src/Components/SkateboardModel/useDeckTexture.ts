import { TextureResult } from "./types";
import { useSRGBTexture } from "./useSRGBTexture";

export const useDeckTexture = <T extends string | string[]>(
  urls = "/skateboard/Deck.webp" as T,
): TextureResult<T> => {
  return useSRGBTexture(urls);
};
