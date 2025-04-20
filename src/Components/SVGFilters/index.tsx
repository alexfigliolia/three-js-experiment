import { Propless } from "Types/React";
import styles from "./styles.module.css";

export function SVGFilters(_: Propless) {
  return (
    <svg className={styles.minimize}>
      <defs>
        {Array.from({ length: 5 }).map((_, index) => (
          <filter id={`squiggle-${index}`} key={index}>
            <feTurbulence
              baseFrequency="0.05"
              id="turbulence"
              numOctaves="2"
              result="noise"
              seed={index}></feTurbulence>
            <feDisplacementMap
              id="displacement"
              in2="noise"
              in="SourceGraphic"
              scale="4"></feDisplacementMap>
          </filter>
        ))}
      </defs>
    </svg>
  );
}
