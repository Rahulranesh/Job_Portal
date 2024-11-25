// jest.config.js

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
  };
  