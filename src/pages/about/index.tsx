import React from 'react';
import { useRouter } from 'next/router';

import { AboutTemplate } from '@templates/About';

const AboutPage = () => {
  const { asPath } = useRouter();

  return <AboutTemplate pathname={asPath} />;
};

export default AboutPage;
