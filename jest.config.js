module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	setupFiles: [ 'D:/EventBand/EventBand/tests/unit/index.js' ],
	testPathIgnorePatterns: [
    '/build/',
    '/config/',
    '/data/',
    '/dist/',
    '/node_modules/',
    '/test/',
    '/vendor/'
  ],
	globals: {
    NODE_ENV: 'test'
  },
}
