/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */

import React, { useMemo, SVGAttributes } from 'react';

type Props = {
  trackColor?: string;
  trackInterval?: number;
  trackCount?: number;
  fontSize?: number;
} & SVGAttributes<SVGElement>;

const source = `
I'm kaave
web engineer.
`
  .trim()
  .split('\n');

const offset = { height: 4 } as const;

export const Typography = ({
  trackColor = '#335',
  trackInterval = 0.8,
  trackCount = 5,
  fontSize = 20,
  fontFamily = "'Crimson text', serif",
  fontWeight = 700,
  ...rest
}: Props) => {
  const gradient = useMemo(() => [...Array(trackCount).keys()], [trackCount]);
  const h = useMemo(() => fontSize * source.length + (fontSize / 4) * (source.length - 1), [fontSize]);

  return (
    <svg fill="transparent" viewBox={`0 0 110 ${h - (source.length - 3) * 3}`} {...rest}>
      <g fontSize={fontSize} fontFamily={fontFamily} fontWeight={fontWeight} strokeWidth={0.15} role="presentation">
        {gradient.map((i) => (
          <g
            key={i}
            opacity={i !== gradient.length - 1 ? 0.08 * (i + 1) : 1}
            style={i !== gradient.length - 1 ? { userSelect: 'none' } : {}}
            {...(i !== gradient.length - 1 ? { stroke: trackColor } : { fill: 'currentColor' })}
          >
            {source.map((text, j) => (
              <text
                key={`${text} ${j}`}
                x={trackInterval * i ** 1.8}
                y={(h / source.length - offset.height) * (j + 1) + offset.height}
                letterSpacing={-1.5}
              >
                {text}
              </text>
            ))}
            ,
          </g>
        ))}
      </g>
    </svg>
  );
};
