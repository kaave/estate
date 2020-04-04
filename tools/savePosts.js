const path = require('path');
const fs = require('fs-extra');

async function savePosts(entries) {
  const savePath = path.join(__dirname, '..', 'public', 'static', 'posts');
  if (await fs.pathExists(savePath)) {
    await fs.remove(savePath);
  }

  await fs.mkdirp(savePath);

  const writeJsonPromises = entries.map((item) => {
    const { id } = item.sys;
    const filePath = path.join(savePath, `${id}.json`);
    return fs.writeJson(filePath, item, { spaces: 4 });
  });

  await Promise.all([...writeJsonPromises, fs.writeJson(path.join(savePath, 'all.json'), entries, { spaces: 4 })]);
}

module.exports = savePosts;
