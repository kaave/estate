const contentful = require('contentful');
const format = require('date-fns/format');

async function loadPosts(spaceId, accessToken) {
  const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  const entries = await client.getEntries({
    content_type: 'post',
    order: '-fields.published',
  });

  return entries;
}

module.exports = loadPosts;
