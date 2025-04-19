import { classnames } from "@figliolia/classnames";
import { asImageSrc } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { BoundedContent } from "Components/BoundedContent";
import { FooterPhysics } from "Components/FooterPhysics";
import { Logo } from "Components/Logo";
import UtilityStyles from "Styles/Utilities.module.css";
import { Propless } from "Types/React";
import { createClient } from "@/prismicio";
import styles from "./styles.module.css";

export const Footer = async (_: Propless) => {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const textures = settings.data.footer_skateboards
    .map(c => asImageSrc(c.skateboard, { h: 600 }))
    .filter(c => c !== null);
  return (
    <footer className={classnames(styles.footer, UtilityStyles.bgTexture)}>
      <div className={styles.boards}>
        <PrismicNextImage
          alt=""
          fill
          width={1200}
          field={settings.data.footer_image}
        />
        <FooterPhysics className={styles.physics} boardTextureURLs={textures} />
        <Logo className={styles.logo} />
      </div>
      <BoundedContent as="nav">
        <ul className={styles.links}>
          {settings.data.navigation.map((link, index) => (
            <li key={link.link.text ?? index}>
              <PrismicNextLink field={link.link} />
            </li>
          ))}
        </ul>
      </BoundedContent>
    </footer>
  );
};
