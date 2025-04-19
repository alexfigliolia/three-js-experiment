import { classnames } from "@figliolia/classnames";
import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";
import styles from "./styles.module.css";

export const Navigation = async ({ className }: Props) => {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <nav aria-label="main" className={classnames(styles.nav, className)}>
      <ul>
        {settings.data.navigation.map(link => (
          <li key={link.link.text}>
            <PrismicNextLink className={styles.link} field={link.link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface Props {
  className?: string;
}
