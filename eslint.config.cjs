const docusaurus = require('@docusaurus/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['build/**', '.docusaurus/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@docusaurus': docusaurus,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...docusaurus.configs.recommended.rules,
      '@docusaurus/no-untranslated-text': ['warn', { ignoredStrings: ['·', '—', '×'] }],
    },
  },
];
