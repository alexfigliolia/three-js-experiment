import { useSRGBTexture } from "./useSRGBTexture";

export const useWheelTexture = <T extends string | string[]>(
  urls = "/skateboard/SkateWheel1.png" as T,
) => {
  return useSRGBTexture(urls);
};
