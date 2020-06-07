import React from 'react';
import { select } from '@storybook/addon-knobs';

import { GlobalHeader } from '.';

export default {
  title: 'GlobalHeader',
};

export const Hello = () => (
  <GlobalHeader current={select('current', ['about', 'posts', 'slides', 'contact'], 'about')} />
);
