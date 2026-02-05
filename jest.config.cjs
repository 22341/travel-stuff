const path = require("path");

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: [path.join(__dirname, "src", "setupTests.js")],
  rootDir: ".",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: false }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/main.tsx",
    "!src/setupTests.js",
  ],
};
