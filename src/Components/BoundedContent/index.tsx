import { CSSProperties, ElementType, ReactNode } from "react";
import { useClassNames } from "@figliolia/classnames";
import styles from "./styles.module.css";

export const BoundedContent = ({
  as: Comp = "section",
  className,
  style,
  children,
}: Props) => {
  const classes = useClassNames(styles.boundedContent, className);
  return (
    // @ts-ignore "come back to me"
    <Comp className={classes} style={style}>
      <div>{children}</div>
    </Comp>
  );
};

interface Props {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
