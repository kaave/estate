import React from 'react';

import { HeadingLevel } from '@domains/valueObjects/HeadingLevel';

type Props = { level: HeadingLevel } & React.HTMLAttributes<HTMLHeadingElement>;

export const Heading = React.memo(
  React.forwardRef(({ level, children, ...rest }: Props) => React.createElement(`h${level}`, rest, children)),
);
