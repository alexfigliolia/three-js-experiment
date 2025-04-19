import { FC } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { BoundedContent } from "Components/BoundedContent";
import Globals from "Styles/Utilities.module.css";
import { ButtonLink } from "@/Components/ButtonLink";
import { Heading } from "@/Components/Heading";
import styles from "./styles.module.css";
import { TallLogo } from "./TallLogo";
import { WideLogo } from "./WideLogo";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const classes = useClassNames(styles.hero, Globals.bgTexture);
  return (
    <BoundedContent
      className={classes}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <WideLogo className={styles.wideLogo} />
      <TallLogo className={styles.tallLogo} />
      <Heading size="lg" className={styles.heading}>
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className={styles.content}></div>
      <div className={styles.meta}>
        <PrismicRichText field={slice.primary.body} />
        <ButtonLink size="lg" field={slice.primary.button} icon="skateboard">
          {slice.primary.button.text}
        </ButtonLink>
      </div>
    </BoundedContent>
  );
};

export default Hero;
