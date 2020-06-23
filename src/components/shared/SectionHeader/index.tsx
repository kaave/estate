import React, { useMemo, useRef, useEffect } from 'react';

import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import styles from './index.module.scss';

type Props = {
  children: string | number;
  lineCount?: number;
  hidden?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
};

export const SectionHeader = ({ children: text, lineCount = 12, hidden = false, onIntersect }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const prevHidden = useRef(hidden);
  const lineSource = useMemo(() => [...Array(lineCount).keys()], [lineCount]);
  const Chars = useMemo(
    () => () => (
      <span role="presentation">
        {text
          .toString()
          .split('')
          .map((c, i) => (
            <span
              key={`${c}_${i}`}
              className={styles.char}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: c === ' ' ? '&nbsp;' : c }}
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
      </span>
    ),
    [text],
  );
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
    <h3 ref={ref} className={styles.root} hidden={hidden || undefined}>
      <span className={styles.inner}>
        <span className={styles.text} aria-label={text.toString()}>
          <Chars />
        </span>
        <span className={styles.background} role="presentation">
          {lineSource.map((i) => (
            <span key={i} className={styles.backgroundLine} />
          ))}
        </span>
      </span>
    </h3>
  );
};
