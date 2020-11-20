module.exports = {
    env: {
        node: true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        /* ======================================= */
        /* POSSIBLE ERRORS ----------------------- */
        // These rules relate to possible syntax or
        // logic errors in the code.
        /* ======================================= */
        'for-direction':                      ['error'],
        'getter-return':                      ['error'],
        'no-async-promise-executor':          ['warn'],
        'no-await-in-loop':                   ['warn'],
        'no-compare-neg-zero':                ['error'],
        'no-cond-assign':                     ['warn', 'except-parens'],
        'no-constant-condition':              ['error', { checkLoops: true }],
        'no-control-regex':                   ['error'],
        'no-debugger':                        ['error'],
        'no-dupe-args':                       ['error'],
        'no-dupe-else-if':                    ['error'],
        'no-dupe-keys':                       ['error'],
        'no-duplicate-case':                  ['error'],
        'no-empty':                           ['warn', { allowEmptyCatch: true }],
        'no-empty-character-class':           ['error'],
        'no-ex-assign':                       ['error'],
        'no-extra-boolean-cast':              ['error', { enforceForLogicalOperands: true }],
        'no-extra-parens':                    ['warn', 'all'],
        'no-extra-semi':                      ['error'],
        'no-func-assign':                     ['error'],
        'no-import-assign':                   ['error'],
        'no-inner-declarations':              ['off'],
        'no-invalid-regexp':                  ['error', { allowConstructorFlags: ['u', 'y'] }],
        'no-irregular-whitespace':            ['error', { skipStrings: true, skipComments: true, skipRegExps: true, skipTemplates: true }],
        'no-loss-of-precision':               ['error'],
        'no-misleading-character-class':      ['error'],
        'no-obj-calls':                       ['error'],
        'no-promise-executor-return':         ['error'],
        'no-prototype-builtins':              ['error'],
        'no-regex-spaces':                    ['warn'],
        'no-setter-return':                   ['error'],
        'no-sparse-arrays':                   ['error'],
        'no-template-curly-in-string':        ['warn'],
        'no-unexpected-multiline':            ['error'],
        'no-unreachable':                     ['error'],
        'no-unreachable-loop':                ['error'],
        'no-unsafe-finally':                  ['error'],
        'no-unsafe-negation':                 ['error'],
        'use-isnan':                          ['warn'],
        'valid-typeof':                       ['error'],

        /* BEST PRACTICES ---------------------- */
        // These rules relate to better ways of
        // doing things to help avoid problems
        // in the codebase.
        /* ===================================== */
        'accessor-pairs':                     ['warn'],
        'array-callback-return':              ['error'],
        'block-scoped-var':                   ['error'],
        'consistent-return':                  ['warn'],
        'curly':                              ['error', 'all'],
        'default-case':                       ['warn'],
        'default-case-last':                  ['error'],
        'default-param-last':                 ['warn'],
        'dot-location':                       ['warn', 'property'],
        'dot-notation':                       ['error'],
        'eqeqeq':                             ['error'],
        'grouped-accessor-pairs':             ['warn', 'getBeforeSet'],
        'no-case-declarations':               ['off'],
        'no-constructor-return':              ['error'],
        'no-div-regex':                       ['warn'],
        'no-else-return':                     ['off'],
        'no-empty-function':                  ['warn'],
        'no-empty-pattern':                   ['off'],
        'no-eq-null':                         ['warn'],
        'no-eval':                            ['warn'],
        'no-extend-native':                   ['off'],
        'no-fallthrough':                     ['off'],
        'no-floating-decimal':                ['warn'],
        'no-global-assign':                   ['error'],
        'no-invalid-this':                    ['error'],
        '@typescript-eslint/no-explicit-any': ['off'],
        
        /* VARIABLES --------------------------- */
        // These rules relate to variables and
        // variable declarations.
        /* ===================================== */
        'no-unused-vars':                     ['off'],
        '@typescript-eslint/no-unused-vars':  ['off'],
        'no-undef':                           ['error'],
        'no-use-before-define':               ['error']
    }
};
