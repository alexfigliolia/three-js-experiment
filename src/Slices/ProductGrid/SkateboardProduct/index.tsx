import { FaStar } from "react-icons/fa6";
import { classnames } from "@figliolia/classnames";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Formatting } from "Tools/Formatting";
import { ButtonLink } from "@/Components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/Components/Line";
import { createClient } from "@/prismicio";
import { Scribble } from "./Scribble";
import styles from "./styles.module.css";

async function getDominantColor(url: string) {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set("palette", "json");
  const response = await fetch(paletteURL);
  const json = await response.json();
  return (
    json?.dominant_colors?.vibrant?.hex ??
    json?.dominant_colors?.vibrant_light?.hex ??
    "#f00"
  );
}

export async function SkateboardProduct({ id }: Props) {
  const client = createClient();
  const skateboard = await client.getByID<Content.SkateboardDocument>(id);
  const price = isFilled.number(skateboard.data.price)
    ? Formatting.formatCurrency(skateboard.data.price)
    : "Price Unavailable";
  const dominantColor = isFilled.image(skateboard.data.image)
    ? await getDominantColor(skateboard.data.image.url)
    : undefined;
  return (
    <article className={styles.skateboardProduct}>
      <VerticalLine className={classnames(styles.verticalLine, styles.first)} />
      <VerticalLine
        className={classnames(styles.verticalLine, styles.second)}
      />
      <HorizontalLine className={styles.horizontalLine} />
      <header>
        <span>{price}</span>
        <span className={styles.rating}>
          <FaStar /> 45
        </span>
      </header>
      <div className={styles.image}>
        <Scribble className={styles.scribble} color={dominantColor} />
        <PrismicNextImage alt="" field={skateboard.data.image} />
      </div>
      <footer>
        <h3>{skateboard.data.name}</h3>
      </footer>
      <div className={styles.customize}>
        <ButtonLink field={skateboard.data.customizer_link}>
          Customize
        </ButtonLink>
      </div>
      <HorizontalLine className={styles.horizontalLine} />
    </article>
  );
}

interface Props {
  id: string;
}
