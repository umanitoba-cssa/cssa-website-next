// eslint.config.mts
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    // -----------------------------
    // JavaScript files
    // -----------------------------
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            prettier: prettierPlugin,
        },
        ...js.configs.recommended,
        rules: {
            // Prettier reports formatting issues, but ESLint won't try to fix them
            'prettier/prettier': 'error',
        },
    },

    // -----------------------------
    // TypeScript + React
    // -----------------------------
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
            prettier: prettierPlugin,
        },
        settings: {
            react: { version: 'detect' }, // automatically detect React version
        },
        rules: {
            // Recommended TS + React rules
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.flat.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // JSX runtime: no React import needed
            'react/react-in-jsx-scope': 'off',

            // Prettier reports formatting issues but does not conflict
            'prettier/prettier': 'error',
        },
    },
]);
