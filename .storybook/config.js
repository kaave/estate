import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import '@styles/index.scss';

// Globally in your .storybook/config.js, or alternatively, per-chapter
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        h2: {
          display: 'inline',
          color: '#ddd',
        },
      },
      infoBody: {
        padding: '0px 5px',
        lineHeight: '2',
      },
    },
    inline: false,
    source: true,
  }),
);

addDecorator(withKnobs());
addDecorator(withA11y());
addParameters({
  backgrounds: [
    // { name: 'white', value: '#f0f0f0', default: true },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
});
// automatically import all files ending in *.stories.js
// configure(require.context('../stories', true, /\.tsx?$/), module);
configure(require.context('../src', true, /stor(ies|y)\.tsx?$/), module);
