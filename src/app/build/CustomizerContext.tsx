"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Content } from "@prismicio/client";
import { OptionalChildren } from "@/Types/React";

const CustomizerContext = createContext<ICustomizerContext>({
  wheel: undefined,
  setWheel: () => {},
  deck: undefined,
  setDeck: () => {},
  truck: undefined,
  setTruck: () => {},
  bolt: undefined,
  setBolt: () => {},
});

interface ICustomizerContext {
  wheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  deck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  truck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  bolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (bolt: Content.BoardCustomizerDocumentDataMetalsItem) => void;
}

export const CustomizerContextProvider = ({
  children,
  defaultWheel,
  defaultBolt,
  defaultDeck,
  defaultTruck,
}: Props) => {
  const [wheel, setWheel] = useState(defaultWheel);
  const [bolt, setBolt] = useState(defaultBolt);
  const [deck, setDeck] = useState(defaultDeck);
  const [truck, setTruck] = useState(defaultTruck);
  const value = useMemo(
    () => ({ wheel, setWheel, bolt, setBolt, deck, setDeck, truck, setTruck }),
    [wheel, bolt, deck, truck],
  );
  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
};

interface Props extends OptionalChildren {
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
}

export const useCustomizer = () => {
  return useContext(CustomizerContext);
};
