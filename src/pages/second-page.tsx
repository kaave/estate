import React from 'react';
import { useRouter } from 'next/router';

import { SecondPageTemplate } from '@templates/SecondPage';

export default React.memo(() => {
  const { pathname } = useRouter();

  return <SecondPageTemplate pathname={pathname} />;
});
