import { createElement, forwardRef, memo } from 'react';
import type { HTMLAttributes } from 'react';

import { HeadingLevel } from '@domains/valueObjects/HeadingLevel';

type Props = { level: HeadingLevel } & HTMLAttributes<HTMLHeadingElement>;

export const Heading = memo(
  forwardRef(({ level, children, ...rest }: Props) => createElement(`h${level}`, rest, children)),
);
