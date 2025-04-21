"use client";
import gsap from "gsap";
import { Fragment, Suspense, useCallback, useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial, RepeatWrapping, Vector3 } from "three";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SkateboardModel, SMController } from "Components/SkateboardModel";
import { useCustomizer } from "../CustomizerContext";
import { useCameraControls } from "./useCameraControls";
import { useSelectedTexture } from "./useSelectedTexture";

const DEFAULT_METAL_COLOR = "#6f6e6a";
const ENVIRONMENT_COLOR = "#3b3a3a";

export const PreviewCanvas = (props: Props) => {
  return (
    <Canvas shadows camera={{ position: [2.5, 1, 0], fov: 50 }}>
      <Preview {...props} />
    </Canvas>
  );
};

function Preview({ deckTextureURLs, wheelTextureURLs }: Props) {
  const floor = useRef<Mesh>(null);
  const controller = useRef<SMController>(null);
  const [camera, setCameraControls] = useCameraControls();

  const { wheel, deck, bolt, truck } = useCustomizer();

  const deckTexture = useSelectedTexture(deckTextureURLs, deck?.texture);
  const wheelTexture = useSelectedTexture(wheelTextureURLs, wheel?.texture);

  const truckColor = truck?.color ?? DEFAULT_METAL_COLOR;
  const boltColor = bolt?.color ?? DEFAULT_METAL_COLOR;

  const onCameraControlStart = useCallback(() => {
    if (
      !camera.current ||
      !floor.current ||
      camera.current.colliderMeshes.length
    ) {
      return;
    }
    camera.current.colliderMeshes = [floor.current];
  }, [camera]);

  useEffect(() => {
    if (truck) {
      setCameraControls(
        new Vector3(-0.12, 0.29, 0.57),
        new Vector3(0.1, 0.25, 0.9),
      );
    }
  }, [truck, setCameraControls]);

  useEffect(() => {
    if (wheel) {
      setCameraControls(
        new Vector3(-0.08, 0.54, 0.64),
        new Vector3(0.09, 1, 0.9),
      );
    }
  }, [wheel, setCameraControls]);

  useEffect(() => {
    if (bolt) {
      setCameraControls(
        new Vector3(-0.25, 0.3, 0.62),
        new Vector3(-0.5, 0.35, 0.8),
      );
    }
  }, [bolt, setCameraControls]);

  useEffect(() => {
    if (deck) {
      setCameraControls(new Vector3(0, 0.3, 0), new Vector3(1.5, 0.8, 0));
    }
  }, [deck, setCameraControls]);

  useEffect(() => {
    if (!controller || !controller.current?.wheels?.current?.length) {
      return;
    }
    for (const wheel of controller.current.wheels.current) {
      if (wheel) {
        gsap.to(wheel.rotation, {
          x: "+=30",
          duration: 2.5,
          ease: "circ.out",
        });
      }
    }
  }, [wheel]);

  return (
    <Fragment>
      <Suspense fallback={null}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        <StageFloor />
        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={floor}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        <SkateboardModel
          pos="side"
          ref={controller}
          boltColor={boltColor}
          truckColor={truckColor}
          deckTexture={deckTexture}
          wheelTexture={wheelTexture}
        />
        <CameraControls
          ref={camera}
          minDistance={0.2}
          maxDistance={4}
          onStart={onCameraControlStart}
        />
      </Suspense>
      <Preload all />
    </Fragment>
  );
}

interface Props {
  deckTextureURLs: string[];
  wheelTextureURLs: string[];
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;
  const material = new MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap: normalMap,
  });
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}>
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
