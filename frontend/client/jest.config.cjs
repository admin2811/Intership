module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom', // Cấu hình môi trường thử nghiệm (thường dùng cho React)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Thiết lập các tệp setup trước khi chạy thử nghiệm
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Biên dịch JS/JSX/MJS bằng Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock các tệp CSS, LESS, SCSS
  },
};
