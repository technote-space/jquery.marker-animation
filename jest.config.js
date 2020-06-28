module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: ['js'],
  coverageDirectory: 'coverage',
};
