import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import { SVGFilters } from "Components/SVGFilters";
import { createClient } from "@/prismicio";
import styles from "./styles.module.css";
import "Styles/globals.css";

const bowlby = Bowlby_One_SC({
  variable: "--font-bowlby",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bowlby.variable} ${dmMono.variable}`}>
        <SVGFilters />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
