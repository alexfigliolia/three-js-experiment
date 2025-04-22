"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content, isFilled } from "@prismicio/client";
import { useCustomizer } from "../CustomizerContext";
import { Option } from "./Option";
import { Options } from "./Options";
import styles from "./styles.module.css";

export const Controls = ({ wheels, decks, metals, className }: Props) => {
  const router = useRouter();
  const classes = useClassNames(styles.controls, className);
  const { setBolt, setDeck, setTruck, setWheel, wheel, deck, truck, bolt } =
    useCustomizer();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (isFilled.keyText(wheel?.uid)) {
      url.searchParams.set("wheel", wheel.uid);
    }
    if (isFilled.keyText(deck?.uid)) {
      url.searchParams.set("deck", deck.uid);
    }
    if (isFilled.keyText(bolt?.uid)) {
      url.searchParams.set("bolt", bolt.uid);
    }
    if (isFilled.keyText(truck?.uid)) {
      url.searchParams.set("truck", truck.uid);
    }
    router.replace(url.href, { scroll: false });
  }, [router, wheel, deck, truck, bolt]);

  return (
    <div className={classes}>
      <Options title="Deck" selectedName={deck?.uid}>
        {decks.map(option => (
          <Option
            key={option.uid}
            imageField={option.texture}
            imgixParams={{
              width: 150,
              height: 150,
              rect: [20, 1550, 1000, 1000],
            }}
            onClick={() => setDeck(option)}
            selected={option.uid === deck?.uid}>
            {option.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={wheel?.uid}>
        {wheels.map(option => (
          <Option
            key={option.uid}
            imageField={option.texture}
            imgixParams={{
              width: 150,
              height: 150,
              rect: [20, 10, 850, 850],
            }}
            onClick={() => setWheel(option)}
            selected={option.uid === wheel?.uid}>
            {option.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={truck?.uid}>
        {metals.map(option => (
          <Option
            key={option.uid}
            colorField={option.color}
            onClick={() => setTruck(option)}
            selected={option.uid === truck?.uid}>
            {option.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={bolt?.uid}>
        {metals.map(option => (
          <Option
            key={option.uid}
            colorField={option.color}
            onClick={() => setBolt(option)}
            selected={option.uid === bolt?.uid}>
            {option.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
};

interface Props
  extends Pick<
    Content.BoardCustomizerDocumentData,
    "wheels" | "decks" | "metals"
  > {
  className?: string;
}
