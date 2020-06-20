import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { AboutTemplate } from '@templates/About';

export default memo(() => {
  const { asPath } = useRouter();

  return <AboutTemplate pathname={asPath} />;
});
