/* eslint-disable @typescript-eslint/camelcase */

import * as configs from '@utils/configs';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => window.gtag('config', configs.googleAnalytics, { page_path: url });

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: any;
}) =>
  window.gtag('event', action, {
    value,
    event_category: category,
    event_label: label,
  });
