import { SRGBColorSpace } from "three";
import { useTexture } from "@react-three/drei";
import { TextureResult } from "./types";

export const useSRGBTexture = <T extends string | string[]>(
  urls: T,
): TextureResult<T> => {
  const deckTextures = useTexture(urls);
  const returnArray = Array.isArray(deckTextures);
  const textures = returnArray ? deckTextures : [deckTextures];
  textures.forEach(t => {
    t.flipY = false;
    t.colorSpace = SRGBColorSpace;
  });
  return deckTextures as TextureResult<T>;
};
