module.exports = {
  roots: ['<rootDir>'],
  'clearMocks': true,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/__mocks__/fileMock.js',
    'src/(.*)': '<rootDir>/src/$1',
    'pages/(.*)': '<rootDir>/pages/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
    '@rtl': '<rootDir>/tests/utils.tsx'
  },
}