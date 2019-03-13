module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
};
