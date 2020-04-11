import React from 'react';

import styles from './index.module.scss';

type Props = {
  message: string;
  onClick?: (message: string) => void;
};

export const Example = ({ message, onClick }: Props) => {
  const handleClick = React.useCallback(() => onClick?.(message), [message, onClick]);

  return (
    <section>
      <h1 className={styles.header}>Test Component</h1>
      <button type="button" onClick={handleClick}>
        {message}
      </button>
    </section>
  );
};
