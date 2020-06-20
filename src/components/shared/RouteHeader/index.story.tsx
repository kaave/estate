import React, { useCallback, useState } from 'react';

import { RouteHeader } from '.';

export default {
  title: 'RouteHeader',
};

export const Base = () => (
  <div style={{ padding: '10px 100px' }}>
    <RouteHeader lineCount={8}>Basic</RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={1}>
      Pattern: first
    </RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={2}>
      Pattern: second
    </RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={3}>
      Pattern: third
    </RouteHeader>
  </div>
);

export const Transition = () => {
  const [hiddenBasic, setHiddenBasic] = useState(true);
  const [hiddenFirst, setHiddenFirst] = useState(true);
  const [hiddenSecond, setHiddenSecond] = useState(true);
  const [hiddenThird, setHiddenThird] = useState(true);

  const handleIntersect = useCallback(
    (value: IntersectionObserverEntry, i: number) => {
      if (value.intersectionRatio !== 1) return;

      switch (i) {
        case 0:
          setHiddenBasic(false);
          break;
        case 1:
          setHiddenFirst(false);
          break;
        case 2:
          setHiddenSecond(false);
          break;
        case 3:
          setHiddenThird(false);
          break;
        default:
          break;
      }

      setHiddenBasic(false);
    },
    [setHiddenBasic, setHiddenFirst, setHiddenSecond, setHiddenThird],
  );
  const handleIntersectBasic = useCallback((entry: IntersectionObserverEntry) => handleIntersect(entry, 0), [
    handleIntersect,
  ]);
  const handleIntersectFirst = useCallback((entry: IntersectionObserverEntry) => handleIntersect(entry, 1), [
    handleIntersect,
  ]);
  const handleIntersectSecond = useCallback((entry: IntersectionObserverEntry) => handleIntersect(entry, 2), [
    handleIntersect,
  ]);
  const handleIntersectThird = useCallback((entry: IntersectionObserverEntry) => handleIntersect(entry, 3), [
    handleIntersect,
  ]);

  return (
    <div style={{ padding: '10px 100px' }}>
      <RouteHeader lineCount={16} hidden={hiddenBasic} onIntersect={handleIntersectBasic}>
        Basic
      </RouteHeader>
      <hr />
      <RouteHeader lineCount={16} pattern={1} hidden={hiddenFirst} onIntersect={handleIntersectFirst}>
        Pattern: first
      </RouteHeader>
      <hr />
      <RouteHeader lineCount={16} pattern={2} hidden={hiddenSecond} onIntersect={handleIntersectSecond}>
        Pattern: second
      </RouteHeader>
      <hr />
      <RouteHeader lineCount={16} pattern={3} hidden={hiddenThird} onIntersect={handleIntersectThird}>
        Pattern: third
      </RouteHeader>
    </div>
  );
};

export const Random = () => (
  <div style={{ padding: '10px 100px' }}>
    <RouteHeader lineCount={8} pattern="random">
      Random
    </RouteHeader>
  </div>
);
