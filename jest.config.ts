import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/tests/mocks/style-mock.js',
    '^~/(.*)$': '<rootDir>/app/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/entry.client.tsx',
    '!app/entry.server.tsx',
    '!app/root.tsx',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
}

export default config;
