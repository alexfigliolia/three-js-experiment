import { FC } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { BoundedContent } from "Components/BoundedContent";
import UtilityStyles from "Styles/Utilities.module.css";
import { ButtonLink } from "@/Components/ButtonLink";
import { Heading } from "@/Components/Heading";
import { ParallaxImage } from "./ParallaxImage";
import styles from "./styles.module.css";

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const { theme } = slice.primary;
  const classes = useClassNames(
    styles.textAndImage,
    UtilityStyles.bgTexture,
    styles[slice.variation],
    theme ? styles[theme] : undefined,
  );
  return (
    <BoundedContent
      className={classes}
      style={{ top: `${index * 2}rem` }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div className={styles.content}>
        <Heading as="h2" size="lg" className={styles.heading}>
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <PrismicRichText field={slice.primary.body} />
        <ButtonLink
          field={slice.primary.button}
          size="lg"
          color={theme === "Lime" ? "orange" : "lime"}>
          {slice.primary.button.text}
        </ButtonLink>
      </div>
      <ParallaxImage
        background={slice.primary.background_image}
        foreground={slice.primary.foreground_image}
      />
    </BoundedContent>
  );
};

export default TextAndImage;
