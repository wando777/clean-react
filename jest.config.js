module.exports = {
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
}