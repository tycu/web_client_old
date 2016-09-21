/**
 * @fileoverview Prevent require('lodash') in order to encourage things like require('lodash/collection/map').
 * @author Aaron Jensen
 * @copyright 2015 Aaron Jensen. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

// import all rules in lib/rules
module.exports.rules = {
  'no-require-lodash': require('./lib/rules/no-require-lodash'),
};

