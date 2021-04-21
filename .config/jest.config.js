module.exports = {
  roots: ['./../'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ['./../tests/jest.setup.tsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testRegex: '/tests/.*\\.(test|spec)\\.tsx?$',
};