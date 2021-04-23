module.exports = {
  roots: ['./'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ['./tests/jest.setup.tsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "@components/(.*)": ["<rootDir>/src/components/$1"],
			"@config/(.*)": ["<rootDir>/src/config/$1"],
			"@hooks/(.*)": ["<rootDir>/src/hooks/$1"],
			"@interfaces/(.*)": ["<rootDir>/src/interfaces/$1"],
			"@layout/(.*)": ["<rootDir>/src/layout/$1"],
			"@models/(.*)": ["<rootDir>/src/models/$1"],
			"@pages/(.*)": ["<rootDir>/src/pages/$1"],
			"@services/(.*)": ["<rootDir>/src/services/$1"],
			"@styles/(.*)": ["<rootDir>/src/styles/$1"],
			"@utils/(.*)": ["<rootDir>/src/utils/$1"],
			"@tests/(.*)": ["<rootDir>/tests/$1"] 
  },
  testRegex: '/tests/.*\\.(test|spec)\\.tsx?$',
};