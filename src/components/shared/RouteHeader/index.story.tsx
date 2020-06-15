import React from 'react';

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

export const Transition = () => (
  <div style={{ padding: '10px 100px' }}>
    <RouteHeader lineCount={8} transition>
      Basic
    </RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={1} transition>
      Pattern: first
    </RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={2} transition>
      Pattern: second
    </RouteHeader>
    <hr />
    <RouteHeader lineCount={8} pattern={3} transition>
      Pattern: third
    </RouteHeader>
  </div>
);

export const Random = () => (
  <div style={{ padding: '10px 100px' }}>
    <RouteHeader lineCount={8} pattern="random">
      Random
    </RouteHeader>
  </div>
);
