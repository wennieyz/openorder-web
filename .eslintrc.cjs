let USE_ALL_LINT_RULES = false
try {
  USE_ALL_LINT_RULES = require('./.eslint-personal-config.js').USE_ALL_LINT_RULES
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('No .eslint-personal-config.js detected, proceeding with defaults.')
  } else {
    throw e
  }
}

// this bans all of the route components that have generic path pieces from passing
// types that usually just lead to pain down the road
function createBannedPathPieceTypes() {
  const routeTypes = [
    'RouteComponentProps',
    'ILoggedInRequiresUserRouteComponentProps',
    'ILoggedInRequiresOrgWithBankingRouteComponentProps',
    'ILoggedInRequiresBusinessOrgWithBankingRouteComponentProps',
    'ILoggedInRequiresPersonalOrgRouteComponentProps',
    'ILoggedInRequiresPersonalOnboardingOrgRouteComponentProps',
    'IAdminRouteComponentProps',
  ]
  const bannedGenericPathPieceTypes = ['any', '{}']

  const eslintBannedTypes = {}

  bannedGenericPathPieceTypes.forEach(bannedPathPieceType => {
    routeTypes.forEach(routeType => {
      eslintBannedTypes[`${routeType}<${bannedPathPieceType}>`] = {
        message:
          "The generic type is for the path pieces, e.g., for `/admin/org/:callsign/tea,`, the path piece would be `interface IPathPieces { callsign: string }`. If your route doesn't have path pieces, don't pass a generic type.",
        fixWith: routeType,
      }
    })
  })

  return eslintBannedTypes
}

const eslintConfig = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:no-unsanitized/DOM',
    'plugin:import/typescript',
    // enables the config from eslint-config-prettier, which turns off some ESLint rules that conflict with Prettier.
    // they want this to be last, so it can always override everything above.
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-import',
    '@typescript-eslint',
    'import',
    'jest',
    'etc', // https://github.com/cartant/eslint-plugin-etc
  ],
  ignorePatterns: ['cms', '.eslintrc.cjs', 'src/__generated__', '!.storybook'],
  rules: {
    'quotes': [2, 'single', {avoidEscape: true}],
    'no-restricted-properties': [
      'warn',
      {
        message: `Please avoid info.getValue() as it is not very type-safe. Use createColumnHelper (most type-safe) or getRowOriginal (if your table does not use grouping) instead.`,
        property: 'getValue',
        object: 'info',
      },
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          ...createBannedPathPieceTypes(),
          '{}': 'If you want to return an empty object, use `EmptyObject`. If you want to return nothing, use `void`. Refer to the README (src/utils/types/EmptyObject/README.md) for more details.',
          'Compute': 'Compute is for display purposes only.',
          'String': {
            message: 'Use string instead',
            fixWith: 'string',
          },
          'Boolean': {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          'Number': {
            message: 'Use number instead',
            fixWith: 'number',
          },
          'Symbol': {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          'BigInt': {
            message: 'Use bigint instead',
            fixWith: 'bigint',
          },
          'Function': {
            message: [
              'The `Function` type accepts any function-like value.',
              'It provides no type safety when calling the function, which can be a common source of bugs.',
              'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
              'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
            ].join('\n'),
          },
        },
        extendDefaults: false,
      },
    ],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: ['objectLiteralProperty'],
        format: ['UPPER_CASE', 'camelCase', 'PascalCase', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['memberLike'],
        format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['classProperty'],
        format: ['UPPER_CASE', 'camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['variable', 'parameter'],
        format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['typeLike'],
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['function'],
        format: ['PascalCase', 'camelCase'],
      },
      // https://typescript-eslint.io/rules/naming-convention/#ignore-properties-that-require-quotes
      {
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
      },
      // We exclude identifiers with names starting with `__UNSAFE_` so that they may
      // be used without breaking linting.
      {
        selector: ['variable', 'parameter', 'memberLike', 'objectLiteralProperty'],
        format: null,
        filter: {
          regex: '^__UNSAFE_',
          match: true,
        },
      },
      // We exclude identifiers with names starting with `__DEPRECATED_` so that they may
      // be used without breaking linting.
      {
        selector: ['variable', 'parameter', 'memberLike', 'objectLiteralProperty'],
        format: null,
        filter: {
          regex: '^__DEPRECATED_',
          match: true,
        },
      },
      // `__sectionName` is used in a normalized Array of `DSComboboxOption`s to group them.
      {
        selector: ['variable', 'parameter', 'memberLike', 'objectLiteralProperty'],
        format: null,
        filter: {
          regex: '^__sectionName$',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        hoist: 'all',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'brace-style': 'off', // off because Prettier does this for us + conflicts with `1tbs` sometimes
    'comma-dangle': 'off',
    'curly': 'error',
    'default-case': 'error',
    'dot-notation': 'off',
    'eol-last': 'off',
    'eqeqeq': ['error', 'smart'],
    'guard-for-in': 'error',
    'id-match': 'error',
    'import/order': [
      'warn',
      {
        alphabetize: {order: 'asc', caseInsensitive: true},
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      },
    ],
    'jest/no-focused-tests': 'warn',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-console': [
      'off',
      {
        allow: [
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-debugger': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    // no-empty-function is turned off because we are using the
    // incompatible rule provided by @typescript-eslint/no-empty-function
    'no-empty-function': 'off',
    'no-eval': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-router',
            message: 'Please import from `react-router-dom` instead.',
          },
          {
            name: 'react-router-dom',
            importNames: ['useLocation'],
            message:
              "Please use the more typesafe version from 'src/hooks/useLocation' instead.",
          },
          {
            name: 'react-redux',
            importNames: ['useDispatch', 'useSelector'],
            message:
              "Please use the already-typed version from 'src/redux/hooks' instead.",
          },
          {
            name: '@testing-library/user-event',
            message:
              'Please use the setupUserEvent function from `src/unit-test/utils` instead.',
          },
          {
            name: '@testing-library/react',
            importNames: ['fireEvent'],
            message:
              'Please use the setupUserEvent function from `src/unit-test/utils` instead.',
          },
        ],
        patterns: [
          {
            group: ['src/*'],
            message:
              'Please use the `~` prefix for internal absolute imports, e.g. `import { foo } from "~/utils"`.',
          },
        ],
      },
    ],
    'no-trailing-spaces': 'off',
    'no-unused-labels': 'error',
    'radix': 0,
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-key': 'error',
    // Reference: https://github.com/MercuryTechnologies/mercury-web/blob/master/docs/01-Coding/frontend-stack/react/react-best-practices.md#use-unique-keys-when-rendering-arrays-of-data
    'react/no-array-index-key': 'error',
    'react/no-children-prop': 'off',
    'react/no-danger': 'error',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/self-closing-comp': 'error',
    'semi': ['error', 'never'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'no-fallthrough': ['error', {allowEmptyCase: true}],
    'etc/no-implicit-any-catch': ['error', {allowExplicitAny: false}],
  },
  overrides: [
    // This is a special override for the Route components, which use the `any` type
    // for RouteComponentProps because they can serve a component with any PathPieces
    {
      files: ['src/components/Route/**/*'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
  settings: {
    'react': {
      version: 'detect',
    },
    // NB: we want to mark the types we created for external packages as still external so our import/order is correctly externals *then* internals
    'import/external-module-folders': ['node_modules', 'src/node_modules'],
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // source: https://github.com/alexgorbatchev/eslint-import-resolver-typescript
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}

// rules we don't want to run in Webpack by default because they make the build slow
if (process.env.CIRCLECI || process.env.USE_ALL_LINT_RULES || USE_ALL_LINT_RULES) {
  eslintConfig.rules['import/no-unused-modules'] = [
    'error',
    {
      missingExports: true,
      unusedExports: true,
      // NB: don't specify `src` so that the entire repo is scanned
      // but exclude the places we don't care if they export things that never get imported
      ignoreExports: [
        '.eslintrc.cjs',
        'webpack.config.ts',
        '.storybook/**/*.ts?(x)',
        '**/*.js',
        '**/*.d.ts',
        '**/*.{test,stories,typetest}.ts?(x)',
        '**/types.ts?(x)',
        '{jest,test,scripts}/**/*.ts?(x)',
        'src/*.ts?(x)',
        'src/{redux,routing,type-definitions,types,unit-test}/**/*.ts?(x)',
        'src/**/utils/**/*.ts?(x)',
      ],
    },
  ]
}

module.exports = eslintConfig
