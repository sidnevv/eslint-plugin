"use strict";

const { isPathRelative } = require("../helpers");

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "description",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string",
          },
        },
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || "";

    const checkingLayers = {
      entities: "entities",
      features: "features",
      pages: "pages",
      widgets: "widgets",
    };

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, "") : value;

        if (isPathRelative(importTo)) {
          return;
        }

        const segments = importTo.split("/");

        const layer = segments[0];

        if (!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;

        if (isImportNotFromPublicApi) {
          context.report(
            node,
            "Абсолютный импорт разрешен только из Public API (index.ts)"
          );
        }
      },
    };
  },
};
