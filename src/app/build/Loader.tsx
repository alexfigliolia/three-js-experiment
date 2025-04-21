"use client";
import { useClassNames } from "@figliolia/classnames";
import { useProgress } from "@react-three/drei";
import UtilityStyles from "Styles/Utilities.module.css";
import { Propless } from "Types/React";
import { Logo } from "@/Components/Logo";
import styles from "./styles.module.css";

export default function Loading(_: Propless) {
  const { progress } = useProgress();
  const classes = useClassNames(
    styles.loading,
    progress >= 100 ? styles.loadingComplete : undefined,
  );
  const logoStyles = useClassNames(styles.logo, UtilityStyles.animateSquiggle);
  return (
    <div className={classes}>
      <Logo className={logoStyles} />
      <p className={UtilityStyles.animateSquiggle}>LOADING...</p>
    </div>
  );
}
