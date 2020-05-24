import React from 'react';
// import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { GlobalHeader } from '.';

export default {
  title: 'GlobalHeader',
};

export const Hello = () => (
  <GlobalHeader current={select('current', ['about', 'posts', 'slides', 'contact'], 'about')} />
);
