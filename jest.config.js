module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        
        "^.+\\.vue$": "@vue/vue3-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.jsx?$": "babel-jest"
    },
    testMatch: [
        '**/*.(spec|test).(js|ts)',
      '**/tests/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)',
      '**/*.test.(js|ts)',
    ],
    transformIgnorePatterns: ['/node_modules/'],
    globals: {
      '@vue/vue3-jest': {
        tsConfig: 'tsconfig.json',
      },
    },
  };