import Link from "next/link";
import { classnames } from "@figliolia/classnames";
import { asImageSrc } from "@prismicio/client";
import { ButtonLink } from "Components/ButtonLink";
import { Heading } from "Components/Heading";
import { Logo } from "Components/Logo";
import UtilityStyles from "Styles/Utilities.module.css";
import { createClient } from "@/prismicio";
import { Controls } from "./Controls";
import { CustomizerContextProvider } from "./CustomizerContext";
import Loading from "./Loader";
import { PreviewCanvas } from "./Preview";
import styles from "./styles.module.css";

export default async function BuildPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");
  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel = wheels.find(w => w.uid === params.wheel) ?? wheels[0];
  const defaultDeck = decks.find(d => d.uid === params.deck) ?? decks[0];
  const defaultBolt = metals.find(m => m.uid === params.bolt) ?? metals[0];
  const defaultTruck = metals.find(m => m.uid === params.truck) ?? metals[0];

  const deckTextureURLS = decks
    .map(deck => asImageSrc(deck.texture))
    .filter((url): url is string => !!url);
  const wheelTextureURLS = wheels
    .map(wheel => asImageSrc(wheel.texture))
    .filter((url): url is string => !!url);

  return (
    <div className={styles.buildPage}>
      <CustomizerContextProvider
        defaultBolt={defaultBolt}
        defaultTruck={defaultTruck}
        defaultDeck={defaultDeck}
        defaultWheel={defaultWheel}>
        <div className={styles.preview}>
          <div className={styles.canvasContainer}>
            <PreviewCanvas
              deckTextureURLs={deckTextureURLS}
              wheelTextureURLs={wheelTextureURLS}
            />
          </div>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>
        <div className={classnames(styles.options, UtilityStyles.bgTexture)}>
          <Heading as="h1" size="sm">
            Build Your Board
          </Heading>
          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className={styles.controls}
          />
          <ButtonLink icon="plus" color="lime" href="/">
            Add to Cart
          </ButtonLink>
        </div>
      </CustomizerContextProvider>
      <Loading />
    </div>
  );
}

interface SearchParams {
  deck?: string;
  bolt?: string;
  truck?: string;
  wheel?: string;
}
