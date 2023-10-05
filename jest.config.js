/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transformIgnorePatterns: [
    "/node_modules/(?!(uuid)/)"
  ],
};