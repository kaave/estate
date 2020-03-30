import React from 'react';
import Link from 'next/link';

import omoriImage from '@images/omori_futan_woman.png';
import unsplashImage from '@images/sai-de-silva-4-gFGb12hFA-unsplash.jpg';
import styles from './second-page.module.scss';

// type Props = {};

const Page = React.memo(() => {
  return (
    <main id="main" className={styles.Main} role="main">
      <div>
        <h1>Hello, World!</h1>
        <img src={unsplashImage} alt="" />
        <img src={omoriImage} alt="" />
        <Link href="/">
          <a>Goto Root</a>
        </Link>
      </div>
    </main>
  );
});

export default Page;
