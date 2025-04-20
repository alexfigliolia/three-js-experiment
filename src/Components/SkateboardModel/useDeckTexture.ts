import { useTexture } from "@react-three/drei";

export const useDeckTexture = (url: string = "/skateboard/Deck.webp") => {
  const deckTexture = useTexture(url);
  deckTexture.flipY = false;
  return deckTexture;
};
