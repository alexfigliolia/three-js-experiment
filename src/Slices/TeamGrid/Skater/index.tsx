import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "Components/Heading";
import { ButtonLink } from "@/Components/ButtonLink";
import { SkaterScribble } from "./SkaterScribble";
import styles from "./styles.module.css";

const COLORS = ["--blue", "--lime", "--orange", "--pink", "--purple"];

export const Skater = ({
  index,
  first_name,
  last_name,
  customizer_link,
  photo_background,
  photo_foreground,
}: Props) => {
  return (
    <article className={styles.skater}>
      <div className={styles.images}>
        <PrismicNextImage
          className={styles.bg}
          field={photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          alt=""
        />
        <SkaterScribble
          className={styles.scribble}
          style={{ color: `var(${COLORS[index % COLORS.length]})` }}
        />
        <PrismicNextImage
          className={styles.fg}
          field={photo_foreground}
          width={500}
          alt=""
        />
        <Heading as="h3" size="md">
          <span>{first_name}</span> <span>{last_name}</span>
        </Heading>
      </div>
      <ButtonLink field={customizer_link} size="md">
        Build Their Board
      </ButtonLink>
    </article>
  );
};

interface Props extends Content.SkaterDocumentData {
  index: number;
}
