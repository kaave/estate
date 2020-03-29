const dotenv = require('dotenv');

const loadPosts = require('./loadPosts');
const savePosts = require('./savePosts');

dotenv.config();

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

async function main() {
  const posts = await loadPosts(spaceId, accessToken);
  await savePosts(posts);
}

main().catch((e) => console.error(e));
