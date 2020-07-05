import React, { useRef, useEffect } from 'react';

import styles from './index.module.scss';

type Props = {
  code: string;
};

export const Content = ({ code }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = Array.from<HTMLHeadingElement>(ref.current.querySelectorAll('h3,h4'));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.3) {
            entry.target.setAttribute('aria-hidden', false.toString());
            observer.unobserve(entry.target);
          }
        }),
      { threshold: [0.3, 1] },
    );
    elements.forEach((element) => observer.observe(element));

    // eslint-disable-next-line consistent-return
    return () => elements.forEach((element) => observer.unobserve(element));
  }, []);

  /* eslint-disable-next-line react/no-danger */
  return <div ref={ref} className={styles.root} dangerouslySetInnerHTML={{ __html: code }} />;
};
