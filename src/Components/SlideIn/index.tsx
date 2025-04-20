"use client";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import UtilityStyles from "Styles/Utilities.module.css";

export const SlideIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
  ...rest
}: Props) => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && node.current) {
          node.current.style.animationDelay = `${delay}s`;
          node.current.style.animationDuration = `${duration}s`;
          node.current.classList.add(UtilityStyles.slideInVisible);
          observer.unobserve(node.current);
        }
      },
      { threshold: 0, rootMargin: "-150px" },
    );
    observer.observe(node.current);
    return () => {
      observer.disconnect();
    };
  }, [delay, duration]);

  const classes = useClassNames(UtilityStyles.slideInHidden, className);

  return (
    <div className={classes} {...rest} ref={node}>
      {children}
    </div>
  );
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  delay?: number;
  children: ReactNode;
}
