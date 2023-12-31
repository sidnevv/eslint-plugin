/**
 * @fileoverview lorem
 * @author sidnevv
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

const aliasOptions = [
  {
    alias: "@",
  },
];

ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\features\\Article",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\features\\Article",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\app\\providers",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\widgets\\pages",
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\app\\providers",
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "c:\\Server\\domains\\react-ts-course\\src\\index.tsx",
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename:
        "c:\\Server\\domains\\react-ts-course\\src\\entities\\Article.tsx",
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: "@",
          ignoreImportPatterns: ["**/StoreProvider"],
        },
      ],
    },
    {
      filename:
        "c:\\Server\\domains\\react-ts-course\\src\\entities\\Article.tsx",
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: "@",
          ignoreImportPatterns: ["**/StoreProvider"],
        },
      ],
    },
  ],

  invalid: [
    {
      filename:
        "c:\\Server\\domains\\react-ts-course\\src\\entities\\providers",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [
        {
          message:
            "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app).",
        },
      ],
      options: aliasOptions,
    },
    {
      filename:
        "c:\\Server\\domains\\react-ts-course\\src\\features\\providers",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [
        {
          message:
            "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app).",
        },
      ],
      options: aliasOptions,
    },
    {
      filename:
        "c:\\Server\\domains\\react-ts-course\\src\\entities\\providers",
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [
        {
          message:
            "A layer can only import underlying layers into itself (shared, entities, features, widgets, pages, app).",
        },
      ],
      options: aliasOptions,
    },
  ],
});
