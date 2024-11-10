module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["@testing-library/react-native/extend-expect", "./setupTests.js"],
    setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}", // couvre tous les fichiers JavaScript/TypeScript dans le répertoire principal
        "!node_modules/**", // exclut le dossier node_modules
        "!coverage/**",
        "!**/_layout.tsx",
        "!**/.*.js",
        "!**/*.config.js",
    ],
};
