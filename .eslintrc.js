module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    // Disable TypeScript comment rules
    // Disable warning for using <img> instead of <Image />
    '@next/next/no-img-element': 'off',

    // Disable error for unused expressions (if you're intentionally using them)
    '@typescript-eslint/no-unused-expressions': 'off',

    // Disable error for empty object/interface declarations
    '@typescript-eslint/no-empty-object-type': 'off',

    // (Optional) Disable other rules you find problematic:
    // For example, if you want to bypass any additional warnings or errors:
    // '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // Allow use of `any`
    '@typescript-eslint/no-explicit-any': 'off',

    // Allow unused variables
    '@typescript-eslint/no-unused-vars': 'off',

    // Disable unescaped entities warnings in React
    'react/no-unescaped-entities': 'off',

    // Disable React hooks exhaustive deps warnings
    'react-hooks/exhaustive-deps': 'off',

    // Allow using let even when a variable could be const
    'prefer-const': 'off',

    // Disable no-extra-semi warnings
    'no-extra-semi': 'off',

    // Disable no-unsafe-function-type warnings
    '@typescript-eslint/no-unsafe-function-type': 'off',
  },
};

