/**
 * @fileoverview descr
 * @author timur
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = [
  {
    alias: '@'
  }
]

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Server\\domains\\react-ts-course\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:\\Server\\domains\\react-ts-course\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],
  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [{ message: "Абсолютный импорт разрешен только из Public API (index.ts)"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Server\\domains\\react-ts-course\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{message: 'Абсолютный импорт разрешен только из Public API (index.ts)'}],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.tsx', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'C:\\Server\\domains\\react-ts-course\\src\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [{message: 'Тестовые данные необходимо импортировать из publicApi/testing.ts'}],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],
});