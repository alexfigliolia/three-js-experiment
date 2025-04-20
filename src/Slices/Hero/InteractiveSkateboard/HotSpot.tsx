import { useCallback, useRef } from "react";
import { Mesh } from "three";
import { Billboard } from "@react-three/drei";

export const HotSpot = ({ position, color = "#E6FC6A" }: Props) => {
  const spot = useRef<Mesh>(null);

  const activatePointer = useCallback(() => {
    document.body.style.cursor = "pointer";
  }, []);

  const deactivatePointer = useCallback(() => {
    document.body.style.cursor = "default";
  }, []);

  return (
    <Billboard follow position={position}>
      <mesh visible ref={spot}>
        <circleGeometry args={[0.02, 32]} />
        <meshStandardMaterial transparent color={color} opacity={1} />
      </mesh>
      <mesh
        visible
        onPointerOver={activatePointer}
        onPointerOut={deactivatePointer}>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial transparent opacity={0.25} color={color} />
      </mesh>
    </Billboard>
  );
};

interface Props {
  color?: string;
  position: [number, number, number];
}
