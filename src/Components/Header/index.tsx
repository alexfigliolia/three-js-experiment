import Link from "next/link";
import { Logo } from "Components/Logo";
import { Propless } from "Types/React";
import { ButtonLink } from "../ButtonLink";
import { Navigation } from "./Navigation";
import styles from "./styles.module.css";

export const Header = async (_: Propless) => {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
        <Navigation className={styles.large} />
        <div>
          <ButtonLink href="/cart" icon="cart" color="purple" aria-label="Cart">
            Cart
          </ButtonLink>
        </div>
      </div>
      <Navigation className={styles.small} />
    </header>
  );
};
