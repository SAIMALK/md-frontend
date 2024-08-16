module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // if you are using TypeScript
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint', // if you are using TypeScript
  ],
  rules: {
    'react/prop-types': 'off', // Adjust based on your requirements
    'no-unused-vars': 'warn', // Adjust based on your requirements
  },
};
