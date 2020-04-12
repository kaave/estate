const contentful = require('contentful');
const markdownIt = require('markdown-it');
const prism = require('markdown-it-prism');
const attrs = require('markdown-it-attrs');

const md = markdownIt({ html: true, linkify: true, breaks: true });
// md.use(prism, options);
md.use(prism);
md.use(attrs);

async function loadPosts(spaceId, accessToken) {
  const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  const entries = await client.getEntries({
    content_type: 'published',
    order: '-fields.published',
  });

  return entries.items.map(({ sys, fields }) => ({
    sys,
    fields: {
      ...fields,
      rawPost: fields.post,
      post: md.render(fields.post),
    },
  }));
}

module.exports = loadPosts;
