import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { ContactTemplate } from '@templates/Contact';

export default memo(() => {
  const { asPath } = useRouter();

  return <ContactTemplate pathname={asPath} />;
});
