const orderingRule = require('@typescript-eslint/eslint-plugin/dist/rules/member-ordering');

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
    },
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    plugins: ['@typescript-eslint', 'jest'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            files: ['**/*.spec.ts'],
            rules: {
                '@typescript-eslint/unbound-method': 'off',
                'jest/unbound-method': 'error',
            },
        },
    ],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/member-ordering': [
            'warn',
            {
                default: {
                    memberTypes: orderingRule.defaultOrder,
                    order: 'as-written',
                },
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'warn',
            {
                accessibility: 'explicit',
                overrides: {
                  accessors: 'explicit',
                  constructors: 'no-public',
                  methods: 'no-public',
                  properties: 'no-public',
                  parameterProperties: 'explicit'
                }
            }
        ],
    },
};
