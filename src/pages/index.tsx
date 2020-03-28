import React from 'react';
import Link from 'next/link';

const HomePage = () => (
  <div>
    <h1>Hello, World!</h1>
    <Link href="/second-page">
      <button type="button">Goto Second Page</button>
    </Link>
  </div>
);

export default HomePage;
