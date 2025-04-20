import { SRGBColorSpace } from "three";
import { useTexture } from "@react-three/drei";

export const useWheelTexture = (
  url: string = "/skateboard/SkateWheel1.png",
) => {
  const wheelTexture = useTexture(url);
  wheelTexture.flipY = false;
  wheelTexture.colorSpace = SRGBColorSpace;
  return wheelTexture;
};
