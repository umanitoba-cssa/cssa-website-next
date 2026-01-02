// eslint.config.mts
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    // Ignore files and folders
    {
        ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', '*.md'],
    },

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
            react: { version: 'detect' },
        },
        rules: {
            // Recommended TS + React rules
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.flat.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            'react/prop-types': 'off',

            // JSX runtime: no React import needed
            'react/react-in-jsx-scope': 'off',

            // Prettier reports formatting issues but does not conflict
            'prettier/prettier': 'error',

            // Enforce self-closing tags where possible
            'react/self-closing-comp': 'error',
        },
    },
]);
