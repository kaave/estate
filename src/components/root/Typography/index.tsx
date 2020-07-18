/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */

import React, { useMemo, SVGAttributes } from 'react';

type Props = {
  trackColor?: string;
  trackInterval?: number;
  trackCount?: number;
  fontSize?: number;
} & SVGAttributes<SVGElement>;

const source = `I'm kaave, web engineer.`;

export const Typography = ({
  trackColor = '#ddd',
  trackInterval = 0.8,
  trackCount = 5,
  fontSize = 20,
  fontFamily = "'Crimson text', serif",
  fontWeight = 700,
  ...rest
}: Props) => {
  const id = useMemo(() => {
    const prefix = Math.floor(Math.random() * 100_000_000_000).toString(36);
    const keys = ['title', 'filter'];
    return keys.reduce<{ [K in typeof keys[number]]: string }>(
      (acc, target) => ({ ...acc, [target]: `${prefix}-${target}` }),
      {},
    );
  }, []);
  const gradient = useMemo(() => [...Array(trackCount).keys()], [trackCount]);
  const h = useMemo(() => fontSize + fontSize / 4, [fontSize]);

  return (
    <svg fill="transparent" viewBox={`0 0 250 ${h}`} aria-labelledby={id.title} role="img" {...rest}>
      <title id={id.title}>{source}</title>
      <defs>
        <filter id={id.filter} x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7 0.4" />
        </filter>
      </defs>
      <g fontSize={fontSize} fontFamily={fontFamily} fontWeight={fontWeight} strokeWidth={0.15} role="presentation">
        {gradient.map((i) => (
          <text
            key={i}
            style={{ userSelect: 'none' }}
            x={trackInterval * i ** 1.8}
            y={h - fontSize / 4}
            letterSpacing={1.5}
            stroke="currentColor"
            opacity={0.5}
            filter={`url(#${id.filter})`}
          >
            {source}
          </text>
        ))}
        <text
          x={trackInterval * (gradient.length / 2) ** 1.8}
          y={h - fontSize / 4}
          letterSpacing={1.5}
          fill="currentColor"
        >
          {source}
        </text>
      </g>
    </svg>
  );
};
