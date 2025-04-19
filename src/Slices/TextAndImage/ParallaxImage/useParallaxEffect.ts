import { useCallback, useEffect, useRef } from "react";
import { usePointerMovement } from "./usePointerMovement";

export const useParallaxEffect = () => {
  const frame = useRef<number>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  const background = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX: number;
    let clientY: number;
    if ("touches" in e) {
      ({ clientX, clientY } = e.touches[0]);
    } else {
      ({ clientX, clientY } = e);
    }
    const { innerHeight, innerWidth } = window;
    targetPosition.current = {
      x: (clientX / innerWidth - 0.5) * 2 * -20,
      y: (clientY / innerHeight - 0.5) * 2 * -20,
    };
  }, []);

  const animationFrame = useCallback(() => {
    const { x: targetX, y: targetY } = targetPosition.current;
    const { x: currentX, y: currentY } = currentPosition.current;

    const newX = currentX + (targetX - currentX) * 0.1;
    const newY = currentY + (targetY - currentY) * 0.1;
    currentPosition.current = { x: newX, y: newY };

    if (background.current) {
      background.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
    if (foreground.current) {
      foreground.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
    }

    frame.current = requestAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    frame.current = requestAnimationFrame(animationFrame);
    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [animationFrame]);

  usePointerMovement(onPointerMove);

  return [background, foreground];
};
