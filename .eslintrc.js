module.exports = {
	env: {
		browser  : true,
		commonjs : true,
		es6      : true,
	},
	extends: [
		`airbnb-base`,
	],
	globals: {
		Atomics           : `readonly`,
		SharedArrayBuffer : `readonly`,
	},
	parserOptions: {
		ecmaVersion: 11,
	},
	rules: {
		'consistent-return' : `error`,
		'brace-style'       : [`error`, `allman`],
		'space-in-parens'   : [`error`, `always`],
		'linebreak-style'   : [`off`],
		indent              : [`error`, `tab`],
		'no-tabs'           : [`error`, { allowIndentationTabs: true }],
		quotes              : [`error`, `backtick`],
		'key-spacing'       : [`error`, {
			align: {
				beforeColon : true,
				afterColon  : true,
				on          : `colon`,
			},
		}],
	},
};
