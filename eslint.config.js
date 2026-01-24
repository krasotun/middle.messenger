import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const prettier = compat.extends('prettier');
const tsStrictTypeChecked = tseslint.configs['flat/strict-type-checked'].map((config) => ({
  ...config,
  files: ['**/*.{ts,mts,cts}'],
  languageOptions: {
    ...config.languageOptions,
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: __dirname,
    },
  },
}));

export default [
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tsStrictTypeChecked,
  ...prettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { prettier: prettierPlugin },
    rules: {
      'no-underscore-dangle': 'off',
      'prettier/prettier': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'no-alert': 'error',
      'no-duplicate-imports': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-use-before-define': 'off',
      'no-shadow': 'off',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
    },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    plugins: { '@typescript-eslint': tseslint, import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.eslint.json',
        },
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts', '.d.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
