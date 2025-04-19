import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, Content } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";
import { components } from "Slices/index";
import { createClient } from "@/prismicio";

const Components = {
  ...components,
  text_and_image_bundle: ({
    slice,
  }: SliceComponentProps<TextAndImageBundle>) => (
    <div>
      <SliceZone slices={slice.slices} components={components} />
    </div>
  ),
};

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => notFound());
  return (
    <SliceZone
      components={Components}
      slices={bundleTextAndImageSlices(page.data.slices)}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

function bundleTextAndImageSlices(
  slices: Content.HomePageDocumentDataSlicesSlice[],
) {
  const result: (
    | Content.HomePageDocumentDataSlicesSlice
    | TextAndImageBundle
  )[] = [];
  for (const slice of slices) {
    if (slice.slice_type !== "text_and_image") {
      result.push(slice);
      continue;
    }
    const top = result.at(-1);
    if (top?.slice_type === "text_and_image_bundle") {
      top.slices.push(slice);
    } else {
      result.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_and_image_bundle",
        slices: [slice],
      });
    }
  }
  return result;
}

interface TextAndImageBundle {
  id: string;
  slice_type: "text_and_image_bundle";
  slices: Content.HomePageDocumentDataSlicesSlice[];
}
