import globals from "globals";
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/semi': ['warn', 'always'],
      eqeqeq: 'warn',
      'no-trailing-spaces': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'arrow-spacing': ['warn', { before: true, after: true }],
    },
  },
  {
    ignores: ['dist/**'],
  },
]