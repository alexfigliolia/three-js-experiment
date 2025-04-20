import { useMemo } from "react";
import { MeshStandardMaterial, RepeatWrapping } from "three";
import { useTexture } from "@react-three/drei";

export const useGripTape = () => {
  const gripTapeDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
  const gripTapeRoughness = useTexture("/skateboard/griptape-roughness.webp");
  return useMemo(() => {
    const material = new MeshStandardMaterial({
      map: gripTapeDiffuse,
      bumpMap: gripTapeRoughness,
      roughnessMap: gripTapeRoughness,
      bumpScale: 3.5,
      roughness: 0.8,
      color: "#555",
    });
    if (gripTapeDiffuse) {
      gripTapeDiffuse.wrapS = RepeatWrapping;
      gripTapeDiffuse.wrapT = RepeatWrapping;
      gripTapeDiffuse.repeat.set(9, 9);
      gripTapeDiffuse.needsUpdate = true;
    }
    if (gripTapeRoughness) {
      gripTapeRoughness.wrapS = RepeatWrapping;
      gripTapeRoughness.wrapT = RepeatWrapping;
      gripTapeRoughness.repeat.set(9, 9);
      gripTapeRoughness.anisotropy = 8;
      gripTapeRoughness.needsUpdate = true;
    }
    return material;
  }, [gripTapeDiffuse, gripTapeRoughness]);
};
