import { FC } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { BoundedContent } from "Components/BoundedContent";
import { Heading } from "Components/Heading";
import { SlideIn } from "Components/SlideIn";
import UtilityStyles from "Styles/Utilities.module.css";
import { SkateboardProduct } from "./SkateboardProduct";
import styles from "./styles.module.css";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {
  const classes = useClassNames(styles.productGrid, UtilityStyles.bgTexture);
  return (
    <BoundedContent
      className={classes}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <SlideIn>
        <Heading as="h2" size="lg" className={styles.heading}>
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <PrismicRichText field={slice.primary.body} />
      </SlideIn>
      <ul className={styles.grid}>
        {slice.primary.products.map(
          ({ skateboard }) =>
            isFilled.contentRelationship(skateboard) && (
              <li key={skateboard.id}>
                <SkateboardProduct id={skateboard.id} />
              </li>
            ),
        )}
      </ul>
    </BoundedContent>
  );
};

export default ProductGrid;
