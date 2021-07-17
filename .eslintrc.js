module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:prettier/recommended'],
  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    'react/no-array-index-key': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
  },
};
