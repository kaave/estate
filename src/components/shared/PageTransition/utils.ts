import React from 'react';
import type { Children, TransitionState } from './model';

export function areChildrenDifferent(prev: Children, next: Children) {
  return prev !== next;
}

export function differentChildrenNeedAnimation(prev: Children, next: Children) {
  if (!prev || !next) {
    return true;
  }

  if (!React.isValidElement(prev) || !React.isValidElement(next)) {
    console.warn('[next-page-transitions] PageTransition child is not a valid React component');
    return true;
  }

  if (prev.key == null || next.key == null) {
    console.warn('[next-page-transitions] PageTransition child does not have a key');
    return true;
  }

  return prev.key !== next.key;
}

export function buildClassName(className: string, state: TransitionState) {
  switch (state) {
    case 'enter':
      return `${className}-enter`;
    case 'entering':
      return `${className}-enter ${className}-enter-active`;
    case 'entered':
      return `${className}-enter-done`;
    case 'exit':
      return `${className}-exit`;
    case 'exiting':
      return `${className}-exit ${className}-exit-active`;
    case 'exited':
      return `${className}-exit-done`;
    default:
      return '';
  }
}

export function shouldDelayEnter(children: Children) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return React.isValidElement(children) && !!(children.type as any).pageTransitionDelayEnter;
}
