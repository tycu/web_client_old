/**
 * @fileoverview Prevent require('lodash') in order to encourage things like require('lodash/collection/map').
 * @author Aaron Jensen
 * @copyright 2015 Aaron Jensen. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../lib/rules/no-require-lodash"),

    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  ecmaFeatures: {
    modules: true
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-require-lodash", rule, {

  valid: [
    "require('lodash/colleciton/map')",
    "require('some-package')",
    "import map from 'lodash/colleciton/map'",
    "import SomePackage from 'some-package'",
    "import {a, b} from 'some-package'"
  ],

  invalid: [
    {
      code: "require('lodash');",
      errors: [{
        message: "Only require specific lodash modules that you need.",
        type: "CallExpression"
      }]
    },
    {
      code: "import lodash from 'lodash'",
      errors: [{
        message: "Only import specific lodash modules that you need.",
        type: "ImportDeclaration"
      }]
    },
    {
      code: "import {map} from 'lodash'",
      errors: [{
        message: "Only import specific lodash modules that you need.",
        type: "ImportDeclaration"
      }]
    }
  ]
});
