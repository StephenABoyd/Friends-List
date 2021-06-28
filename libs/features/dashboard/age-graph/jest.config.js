module.exports = {
  displayName: 'features-dashboard-age-graph',
  preset: '../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  // Disabled until fixed Jest config for D3
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../../../coverage/libs/features/dashboard/age-graph',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
