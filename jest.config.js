module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/',
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}', // couvre tous les fichiers JavaScript/TypeScript dans le répertoire principal
        '!node_modules/**', // exclut le dossier node_modules
        '!coverage/**',
        '!**/_layout.tsx',
        '!**/.*.js',
        '!**/*.config.js',
    ],
};
