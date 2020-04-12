/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';

import { useFocusedOnOutside } from '@hooks/useFocusedOnOutside';

type Props = {
  children: React.ReactNode;
  onFocusOutside?: () => void;
};

export const FocusGuardrail = ({ onFocusOutside, children }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const handleFocusedOnOutside = React.useCallback(() => onFocusOutside?.(), [onFocusOutside]);

  useFocusedOnOutside(ref, handleFocusedOnOutside, { active: !!onFocusOutside });

  return (
    <div ref={ref}>
      <span className="-sr-only" tabIndex={0} role="presentation" onFocus={handleFocusedOnOutside} />
      {children}
      <span className="-sr-only" tabIndex={0} role="presentation" onFocus={handleFocusedOnOutside} />
    </div>
  );
};
