module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '((\\.|/*.)(spec))\\.jsx?$',
  transform: {
    '^.+\\.(js|jsx)$': '@swc/jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
