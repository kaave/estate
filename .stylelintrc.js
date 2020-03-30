module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-scss',
  ],
  ignoreFiles: ['node_modules/**/*', '.cache/**/*', 'public/**/*'],
  syntax: 'scss',
  rules: {
    /*
     * Manual
     */
    // �コメント記号とコメント本文の間にスペースを強要する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // @なにがしで意味不明なものを無効化 mixin関係を通す
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'include'] }],
    // 複雑すぎる指定はNG ただし属性っぽいものはだいたいOK
    'selector-max-specificity': ['0,2,0', { ignoreSelectors: ['/:.*/', '/-[^-].*/', '/ + /'] }],
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // @extendは難しいから禁止
    'at-rule-blacklist': ['extend'],
    // CSS Modules用の記法を許可
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
  },
};
