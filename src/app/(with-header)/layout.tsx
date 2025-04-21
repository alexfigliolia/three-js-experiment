import { Fragment } from "react";
import { Footer } from "Components/Footer";
import { Header } from "Components/Header";
import { OptionalChildren } from "Types/React";

export default function Layout({ children }: OptionalChildren) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
