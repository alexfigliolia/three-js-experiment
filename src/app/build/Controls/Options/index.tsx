import { ReactNode, useMemo } from "react";
import { KeyTextField } from "@prismicio/client";
import { Heading } from "@/Components/Heading";
import { OptionalChildren } from "@/Types/React";
import styles from "./styles.module.css";

export const Options = ({ title, selectedName, children }: Props) => {
  const formatted = useMemo(
    () => selectedName?.replace(/-/g, " "),
    [selectedName],
  );
  return (
    <div className={styles.options}>
      <div>
        <Heading as="h2" size="xs">
          {title}
        </Heading>
        <p>
          <span>| </span>
          {formatted}
        </p>
      </div>
      <ul>{children}</ul>
    </div>
  );
};

interface Props extends OptionalChildren {
  title?: ReactNode;
  selectedName?: KeyTextField;
}
