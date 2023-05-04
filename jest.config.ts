module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // ...otros transformadores
    '\\.(scss)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  testMatch: [
    '**/__tests__/*.(js|ts|tsx)',
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  globals: {
    '@vue/vue3-jest': {
      tsConfig: 'tsconfig.json'
    },
    "jest-dom": true
  }
}