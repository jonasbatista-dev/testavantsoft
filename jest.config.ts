import { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules/(?!(@nivo)/)'],
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;
