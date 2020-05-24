import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { SecondPageTemplate } from '@templates/SecondPage';

export default memo(() => {
  const { pathname } = useRouter();

  return <SecondPageTemplate pathname={pathname} />;
});
