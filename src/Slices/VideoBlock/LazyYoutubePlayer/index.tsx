"use client";
import { useEffect, useRef, useState } from "react";
import { KeyTextField } from "@prismicio/client";
import styles from "./styles.module.css";

export function LazyYouTubePlayer({ youTubeID }: Props) {
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0, rootMargin: "1500px" },
    );
    observer.observe(container.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.youtubePlayer} ref={container}>
      {visible && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </div>
  );
}

interface Props {
  youTubeID: KeyTextField;
}
