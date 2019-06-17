module.exports = {
	verbose: false,
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
	},
	moduleFileExtensions: [ 'js' ],
	coverageDirectory: 'coverage',
};