/**
 * @fileoverview Prevent require('lodash') in order to encourage things like require('lodash/collection/map').
 * @author Aaron Jensen
 * @copyright 2015 Aaron Jensen. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

module.exports = function(context) {
  return {
    "CallExpression": function(node) {
      if (
        node.callee.name === 'require' &&
          node.arguments[0] &&
          node.arguments[0].value === 'lodash'
      ) {
        context.report(node, "Only require specific lodash modules that you need.");
      }
    },
    "ImportDeclaration": function(node) {
      if (
        node.source &&
          node.source.type === 'Literal' &&
          node.source.value === 'lodash'
      ) {
        context.report(node, "Only import specific lodash modules that you need.");
      }
    },
  };
};

module.exports.schema = [];
