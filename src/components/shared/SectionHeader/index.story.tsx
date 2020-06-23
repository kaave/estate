import React, { useCallback, useState } from 'react';

import { SectionHeader } from '.';

export default {
  title: 'SectionHeader',
};

export const Base = () => (
  <div style={{ padding: '10px 100px' }}>
    <SectionHeader>Basic</SectionHeader>
  </div>
);

export const Transition = () => {
  const [hiddenBasic, setHiddenBasic] = useState(true);

  const handleIntersect = useCallback(
    (value: IntersectionObserverEntry, i: number) => {
      if (value.intersectionRatio !== 1) return;

      switch (i) {
        case 0:
          setHiddenBasic(false);
          break;
        default:
          break;
      }

      setHiddenBasic(false);
    },
    [setHiddenBasic],
  );
  const handleIntersectBasic = useCallback((entry: IntersectionObserverEntry) => handleIntersect(entry, 0), [
    handleIntersect,
  ]);

  return (
    <div style={{ padding: '10px 100px' }}>
      <SectionHeader lineCount={16} hidden={hiddenBasic} onIntersect={handleIntersectBasic}>
        Basic
      </SectionHeader>
    </div>
  );
};
