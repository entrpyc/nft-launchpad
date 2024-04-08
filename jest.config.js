module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Optional setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Optional path mapping
  },
};