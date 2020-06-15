import React, { useMemo, useRef, useState } from 'react';

import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import styles from './index.module.scss';

type Props = {
  children: string | number;
  pattern?: 1 | 2 | 3 | 'random';
  lineCount?: number;
  transition?: boolean;
};

export const RouteHeader = ({ children, pattern, lineCount = 8, transition = false }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [hidden, setHidden] = useState(transition);
  const { lineTop, lineHeight } = useMemo(() => {
    const lineTop = [...Array(lineCount).keys()].map((i) => (100 / lineCount) * i);
    const lineHeight = `${100 / lineTop.length}%`;

    return { lineTop, lineHeight };
  }, [lineCount]);
  useIntersectionObserver(
    ref,
    (value: IntersectionObserverEntry) => value.intersectionRatio === 1 && setHidden(false),
    { threshold: [0, 1] },
  );

  return (
    <h2 ref={ref} className={styles.root} data-background-pattern={pattern} hidden={hidden || undefined}>
      <span className={styles.textContainer}>
        <span className={styles.text}>{children}</span>
        <span className={styles.background} role="presentation">
          {lineTop.map((top) => (
            <span
              key={top}
              className={styles.backgroundLine}
              style={{
                top: `${top}%`,
                height: lineHeight,
                ...(pattern === 'random' ? { transform: `translateX(-${Math.floor(Math.random() * 60)}px)` } : {}),
              }}
            />
          ))}
        </span>
      </span>
    </h2>
  );
};
