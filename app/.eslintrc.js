module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
        node: true,
        commonjs: true,
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "warn"
    }
};