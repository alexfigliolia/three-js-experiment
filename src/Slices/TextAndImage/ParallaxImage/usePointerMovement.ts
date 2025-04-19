import { useEffect } from "react";

export const usePointerMovement = (
  callback: (e: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    window.addEventListener("mousemove", callback);
    window.addEventListener("touchmove", callback);
    return () => {
      window.removeEventListener("mousemove", callback);
      window.removeEventListener("touchmove", callback);
    };
  }, [callback]);
};
