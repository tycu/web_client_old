/**
 * @fileoverview Suggest using the spread operator over Object.assign.
 * @author Erik Desjardins
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

module.exports = {
	rules: {
		'prefer-object-spread': require('./rules/prefer-object-spread')
	}
};
