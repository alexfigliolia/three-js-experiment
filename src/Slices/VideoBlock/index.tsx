import Image from "next/image";
import { FC } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { BoundedContent } from "Components/BoundedContent";
import UtilityStyles from "Styles/Utilities.module.css";
import { LazyYouTubePlayer } from "./LazyYoutubePlayer";
import styles from "./styles.module.css";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  const classes = useClassNames(styles.videoBlock, UtilityStyles.bgTexture);
  const limeStyles = useClassNames(styles.mask, styles.lime);
  const whiteStyles = useClassNames(styles.mask, styles.white);
  const whiteStyles2 = useClassNames(styles.mask, styles.white2);
  const playerClasses = useClassNames(styles.player, styles.mask);
  return (
    <BoundedContent
      className={classes}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <h2 className={styles.SROnly}>Video Reel</h2>
      <div className={styles.video}>
        <div className={limeStyles} />
        <div className={whiteStyles} />
        <div className={whiteStyles2} />
        <div className={playerClasses}>
          {isFilled.keyText(slice.primary.youtube_video_id) && (
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          )}
          <Image
            src="/image-texture.png"
            alt=""
            aria-hidden
            fill
            className={styles.texture}
          />
        </div>
      </div>
    </BoundedContent>
  );
};

export default VideoBlock;
