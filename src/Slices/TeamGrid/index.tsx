import { FC } from "react";
import { classnames } from "@figliolia/classnames";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import UtilityStyles from "Styles/Utilities.module.css";
import { BoundedContent } from "@/Components/BoundedContent";
import { Heading } from "@/Components/Heading";
import { createClient } from "@/prismicio";
import { Skater } from "./Skater";
import styles from "./styles.module.css";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");
  return (
    <BoundedContent
      className={classnames(styles.teamGrid, UtilityStyles.bgTexture)}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Heading as="h2">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <ul>
        {skaters.map(
          (skater, i) =>
            skater.data.first_name && (
              <li key={skater.id}>
                <Skater index={i} {...skater.data} />
              </li>
            ),
        )}
      </ul>
    </BoundedContent>
  );
};

export default TeamGrid;
