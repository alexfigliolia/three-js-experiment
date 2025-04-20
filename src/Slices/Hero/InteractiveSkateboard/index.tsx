"use client";
import gsap from "gsap";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { ContactShadows, Environment, Html } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  Props as SMProps,
  SkateboardModel,
  SMController,
} from "Components/SkateboardModel";
import { useDeckTexture } from "Components/SkateboardModel/useDeckTexture";
import { useWheelTexture } from "Components/SkateboardModel/useWheelTexture";
import { HotSpot } from "./HotSpot";
import styles from "./styles.module.css";
import { Tricks } from "./Tricks";
import { WavyPaths } from "./WavyPaths";

const CAMERA_POSITION = [1.5, 1, 1.4] as const;

export const InteractiveSkateboard = (props: Props) => {
  return (
    <div className={styles.interactiveSkateboard}>
      <Canvas
        className={styles.canvas}
        camera={{ position: CAMERA_POSITION, fov: 55 }}>
        <Suspense>
          <Scene {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene({ wheelTextureURL, deckTextureURL, ...rest }: Props) {
  const deckTexture = useDeckTexture(deckTextureURL);
  const wheelTexture = useWheelTexture(wheelTextureURL);
  const controller = useRef<SMController>(null);
  const container = useRef<Group>(null);
  const origin = useRef<Group>(null);

  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new Vector3(-0.2, 0.15, 0));

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);
      camera.position.x = CAMERA_POSITION[0] * scale;
      camera.position.y = CAMERA_POSITION[1] * scale;
      camera.position.z = CAMERA_POSITION[2] * scale;
    }

    setZoom();
    window.addEventListener("resize", setZoom);
    return () => {
      window.removeEventListener("resize", setZoom);
    };
  }, [camera]);

  useEffect(() => {
    if (!origin.current || !container.current) {
      return;
    }
    gsap.to(container.current.position, {
      x: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(origin.current.rotation, {
      y: Math.PI / 64,
      duration: 3,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useFrame(() => {
    if (!controller || !controller.current?.wheels?.current?.length) {
      return;
    }
    for (const wheel of controller.current.wheels.current) {
      if (wheel) {
        wheel.rotation.x += 0.4;
      }
    }
  });

  // gsap rotation with damping
  // useEffect(() => {
  //   if (!controller || !controller.current?.wheels?.current?.length) {
  //     return;
  //   }
  //   for (const wheel of controller.current.wheels.current) {
  //     if (wheel) {
  //       gsap.to(wheel.rotation, {
  //         x: "+=30",
  //         duration: 2.5,
  //         ease: "circ.out",
  //       });
  //     }
  //   }
  // }, [wheelTextureURL]);

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!container.current || !origin.current) {
      return;
    }
    const { name } = e.object;
    if (name === "board-back") {
      void Tricks.olly(
        container.current!.position,
        container.current!.rotation,
      );
    } else if (name === "board-center") {
      void Tricks.kickflip(
        container.current!.position,
        container.current!.rotation,
      );
    } else if (name === "board-front") {
      void Tricks.frontside360(
        container.current!.position,
        container.current!.rotation,
        origin.current!.rotation,
      );
    }
  }, []);

  return (
    <group>
      <Environment files="/hdr/warehouse-256.hdr" />
      <group ref={origin}>
        <group ref={container} position={[-0.25, 0, -0.635]}>
          <group position={[0, -0.086, 0.635]}>
            <SkateboardModel
              {...rest}
              ref={controller}
              deckTexture={deckTexture}
              wheelTexture={wheelTexture}
            />
            <HotSpot position={[0, 0.38, 1]} color="#B8FC39" />
            <HotSpot position={[0, 0.33, 0]} color="#FF7A51" />
            <HotSpot position={[0, 0.35, -0.9]} color="#46ACFA" />
            <mesh
              onClick={onClick}
              position={[0, 0.27, 0.9]}
              name="board-front">
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh onClick={onClick} position={[0, 0.27, 0]} name="board-center">
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh
              onClick={onClick}
              position={[0, 0.27, -0.9]}
              name="board-back">
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}>
        <Html
          wrapperClass={styles.noPointer}
          occlude="blending"
          transform
          zIndexRange={[1, 0]}>
          <WavyPaths />
        </Html>
      </group>
    </group>
  );
}

interface Props
  extends Omit<SMProps, "deckTexture" | "wheelTexture" | "spinWheels"> {
  wheelTextureURL?: string;
  deckTextureURL?: string;
}
