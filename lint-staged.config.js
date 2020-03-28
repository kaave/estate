module.exports = {
  '*.{ts,tsx}': ['eslint --fix'],
  '*.scss': ['stylelint --fix'],
  '*.json': ['prettier --write'],
  'package.json': ['sort-package-json'],
};
