import { FaCartShopping, FaPlus } from "react-icons/fa6";
import { useClassNames } from "@figliolia/classnames";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { SkateboardIcon } from "Icons/Skateboard";
import UtilityStyles from "Styles/Utilities.module.css";
import styles from "./styles.module.css";

export function ButtonLink({
  color = "orange",
  size = "md",
  icon,
  children,
  className,
  ...props
}: Props) {
  const classes = useClassNames(
    styles.buttonLink,
    UtilityStyles.buttonCutout,
    styles[size],
    styles[color],
    className,
  );
  return (
    <PrismicNextLink className={classes} {...props}>
      {icon ? (
        <>
          <div className={styles[size]}>
            {icon === "cart" && <FaCartShopping />}
            {icon === "skateboard" && <SkateboardIcon />}
            {icon === "plus" && <FaPlus />}
          </div>
        </>
      ) : null}
      {children}
    </PrismicNextLink>
  );
}

export type Props = PrismicNextLinkProps & {
  color?: "orange" | "purple" | "lime";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: "cart" | "skateboard" | "plus";
};
