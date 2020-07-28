import React from 'react';
import { useRouter } from 'next/router';

import { ContactTemplate } from '@templates/Contact';

const ContactPage = () => {
  const { asPath } = useRouter();

  return <ContactTemplate pathname={asPath} />;
};

export default ContactPage;
