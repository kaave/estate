import React from 'react';
import { useRouter } from 'next/router';

import { AboutTemplate } from '@templates/About';

export default () => {
  const { asPath } = useRouter();

  return <AboutTemplate pathname={asPath} />;
};
