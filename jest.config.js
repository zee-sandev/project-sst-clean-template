/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)']
}
