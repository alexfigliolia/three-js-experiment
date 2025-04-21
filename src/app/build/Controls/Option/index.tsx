import { ComponentProps, ReactNode } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColorField, ImageField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import styles from "./styles.module.css";

export const Option = ({
  selected,
  children,
  colorField,
  imageField,
  imgixParams,
  className,
  ...rest
}: Props) => {
  const classes = useClassNames(
    styles.option,
    className,
    selected ? styles.selected : undefined,
  );
  return (
    <li>
      <button className={classes} {...rest}>
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            alt=""
          />
        ) : (
          <div style={{ backgroundColor: colorField ?? undefined }} />
        )}
        <span>{children}</span>
      </button>
    </li>
  );
};

interface CommonProps extends Omit<ComponentProps<"button">, "children"> {
  selected: boolean;
  children: ReactNode;
}

type Props = CommonProps &
  (
    | {
        colorField?: never;
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );
