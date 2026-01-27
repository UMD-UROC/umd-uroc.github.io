module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['build/', '.docusaurus/', 'node_modules/'],
  extends: ['plugin:@docusaurus/recommended'],
  rules: {
    '@docusaurus/no-untranslated-text': ['warn', { ignoredStrings: ['·', '—', '×'] }],
  },
};
