module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '^.+\\.(jpg|jpeg|png|gif|ico|svg)$': '<rootDir>/__mocks__/fileMock.ts', // Mock File for images
      '^.+\\.(eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.ts', // Mock File for fonts and audio/video files
    }
  };
  