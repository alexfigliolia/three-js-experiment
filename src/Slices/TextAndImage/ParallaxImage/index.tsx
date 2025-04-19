"use client";
import { useClassNames } from "@figliolia/classnames";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./styles.module.css";
import { useParallaxEffect } from "./useParallaxEffect";

export const ParallaxImage = ({ foreground, background, className }: Props) => {
  const [backgroundRef, foregroundRef] = useParallaxEffect();
  const classes = useClassNames(styles.parallaxImage, className);
  return (
    <div className={classes}>
      <div className={styles.image} ref={backgroundRef}>
        <PrismicNextImage alt="" field={background} />
      </div>
      <div className={styles.image} ref={foregroundRef}>
        <PrismicNextImage
          alt=""
          field={foreground}
          imgixParams={{ height: 600 }}
        />
      </div>
    </div>
  );
};

interface Props {
  className?: string;
  foreground: ImageField;
  background: ImageField;
}
