/**
 * @fileoverview Suggest using the spread operator over Object.assign.
 * @author Erik Desjardins
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

module.exports = function(context) {
	var includeNearEquivalents = context.options[0] === 'includeNearEquivalents';

	return {
		CallExpression: function(node) {
			if (!node.arguments.length) {
				return;
			}

			if (node.callee.type !== 'MemberExpression') {
				return;
			}

			var object = node.callee.object;

			if (object.type !== 'Identifier') {
				return;
			}

			var property = node.callee.property;

			var obj = object.name;
			var method = property.name;

			var isEquivalentMethod = (
				obj === 'Object' && method === 'assign' ||
				obj === '_' && method === 'assign'
			);
			var isNearEquivalentMethod = includeNearEquivalents && (
				obj === '$' && method === 'extend' ||
				obj === '_' && (method === 'assignIn' || method === 'extend')
			);

			if (!isEquivalentMethod && !isNearEquivalentMethod) {
				return;
			}

			if (node.arguments[0].type !== 'ObjectExpression') {
				return;
			}

			context.report({
				node: property,
				message: 'Expected spread operator.'
			});
		}
	};
};

module.exports.schema = [
	{
		enum: ['includeNearEquivalents']
	}
];
