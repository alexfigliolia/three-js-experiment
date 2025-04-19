import { ReactNode } from "react";
import { useClassNames } from "@figliolia/classnames";
import styles from "./styles.module.css";

export function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: Props) {
  const classes = useClassNames(styles.heading, styles[size], className);
  return <Comp className={classes}>{children}</Comp>;
}

interface Props {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: ReactNode;
  className?: string;
}
