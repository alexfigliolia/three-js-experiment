import { FC } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { BoundedContent } from "Components/BoundedContent";
import { ButtonLink } from "Components/ButtonLink";
import { Heading } from "Components/Heading";
import Globals from "Styles/Utilities.module.css";
import { useImageSource } from "Tools/useImageSource";
import { InteractiveSkateboard } from "./InteractiveSkateboard";
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
  const {
    body,
    button,
    heading,
    skateboard_bolt_color,
    skateboard_truck_color,
    skateboard_deck_texture,
    skateboard_wheel_texture,
  } = slice.primary;
  const deckTexture = useImageSource(skateboard_deck_texture);
  const wheelTexture = useImageSource(skateboard_wheel_texture);
  return (
    <BoundedContent
      className={classes}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <WideLogo className={styles.wideLogo} />
      <TallLogo className={styles.tallLogo} />
      <Heading size="lg" className={styles.heading}>
        <PrismicText field={heading} />
      </Heading>
      <div className={styles.meta}>
        <PrismicRichText field={body} />
        <ButtonLink size="xl" field={button} icon="skateboard">
          {button.text}
        </ButtonLink>
      </div>
      <InteractiveSkateboard
        deckTextureURL={deckTexture}
        wheelTextureURL={wheelTexture}
        boltColor={skateboard_bolt_color ?? undefined}
        truckColor={skateboard_truck_color ?? undefined}
      />
    </BoundedContent>
  );
};

export default Hero;
