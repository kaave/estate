export const production = process.env.NODE_ENV === 'production';
export const baseUrl = process.env.SITE_URL || 'https://t.co';
export const title = process.env.SITE_TITLE || '__SET_YOUR_SITE_TITLE__';
export const description = process.env.SITE_DESCRIPTION || '__SET_YOUR_SITE_DESCRIPTION__';
export const descriptionTemplate = process.env.SITE_DESCRIPTION_TEMPLATE || '「{0}」について';
export const ogp = process.env.SITE_OGP || 'https://t.co/image';
export const authorName = process.env.AUTHOR_NAME || '__SET_YOUR_NAME__';
export const authorTwitter = process.env.AUTHOR_TWITTER;
export const googleAnalytics = production ? process.env.GOOGLE_ANALYTICS : undefined;

// https://polyfill.io/v3/url-builder/
export const polyfills = ['default', 'es2015', 'es2016', 'es2017', 'IntersectionObserver'].join('%2C');
