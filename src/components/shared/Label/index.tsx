import React, { useMemo, useRef, useEffect } from 'react';

import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import styles from './index.module.scss';

type Props = {
  children: string | number;
  lineCount?: number;
  hidden?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
};

export const Label = ({ children, lineCount = 8, hidden = false, onIntersect }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const prevHidden = useRef(hidden);
  const { lineTop, lineHeight } = useMemo(() => {
    const lineTop = [...Array(lineCount).keys()].map((i) => (100 / lineCount) * i);
    const lineHeight = `${100 / lineTop.length}%`;

    return { lineTop, lineHeight };
  }, [lineCount]);
  const { unobserve } = useIntersectionObserver(ref, (value: IntersectionObserverEntry) => onIntersect?.(value), {
    threshold: [0, 1],
  });
  useEffect(() => {
    if (prevHidden.current && !hidden) {
      prevHidden.current = hidden;
      unobserve();
    }
  }, [hidden, unobserve]);

  return (
    <span ref={ref} className={styles.root} hidden={hidden || undefined}>
      <span className={styles.textContainer}>
        <span className={styles.text}>{children}</span>
        <span className={styles.background} role="presentation">
          {lineTop.map((top) => (
            <span key={top} className={styles.backgroundLine} style={{ top: `${top}%`, height: lineHeight }} />
          ))}
        </span>
      </span>
    </span>
  );
};
