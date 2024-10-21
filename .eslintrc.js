module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
    'prettier', // Добавлено расширение 'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'boundaries',
    '@typescript-eslint',
    'react',
    'react-native',
    'prettier',
    'import',
    'react-hooks',
  ],
  settings: {
    'boundaries/include': ['src/**/*', 'app/**/*'],
    'boundaries/elements': [
      {
        type: 'shared',
        pattern: 'src/shared/**',
      },
      {
        type: 'feature',
        pattern: 'src/features/*/**',
        capture: ['featureName'],
      },
      {
        type: 'app',
        pattern: 'app/**',
      },
    ],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@features', './src/features'],
          ['@shared', './src/shared'],
          ['@app', './app'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/prop-types': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'prettier/prettier': 'warn',
    'boundaries/no-unknown': 'error',
    'boundaries/no-unknown-files': 'error',
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'shared',
            allow: ['shared'],
          },
          {
            from: 'feature',
            allow: [
              'shared',
              ['feature', { featureName: '${from.featureName}' }],
            ],
          },
          {
            from: 'app',
            allow: ['shared', 'feature'],
          },
        ],
      },
    ],
    'import/no-unresolved': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true,
  },
};
