module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
      },
    setupFilesAfterEnv: [
        "<rootDir>/jest-setup.ts"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/file-mock.ts"
    }
}