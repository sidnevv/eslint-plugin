/**
 * @fileoverview feature sliced relative path checker
 * @author victor
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: "C:\\Server\\domains\\react-ts-course\\src\\entities\\Article",
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: "C:\\Server\\domains\\react-ts-course\\src\\entities\\Article",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [
        {
          message: "Within a single slide, all paths must be relative.",
        },
      ],
      options: [{ alias: "@" }],
    },
    {
      filename: "C:\\Server\\domains\\react-ts-course\\src\\entities\\Article",
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [
        {
          message: "Within a single slide, all paths must be relative.",
        },
      ],
    },
  ],
});
