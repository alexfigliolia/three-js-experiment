import { useMemo } from "react";
import { MeshStandardMaterial, RepeatWrapping, Vector2 } from "three";
import { useTexture } from "@react-three/drei";

export const useTrucks = (color: string = "#555") => {
  const metalNormal = useTexture("/skateboard/metal-normal.avif");
  metalNormal.wrapS = RepeatWrapping;
  metalNormal.wrapT = RepeatWrapping;
  metalNormal.anisotropy = 8;
  metalNormal.repeat.set(8, 8);
  return useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        metalness: 0.8,
        roughness: 0.25,
        normalMap: metalNormal,
        normalScale: new Vector2(0.3, 0.3),
      }),
    [color, metalNormal],
  );
};
