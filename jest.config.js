module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	setupFiles: [ __dirname + '/tests/unit/index.js' ],
	testURL: "http://localhost:8080",
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
