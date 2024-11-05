module.exports = {
    preset: "jest-expo",
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}", // couvre tous les fichiers JavaScript/TypeScript dans le répertoire principal
        "!node_modules/**", // exclut le dossier node_modules
        "!coverage/**",
        "!**/_layout.tsx",
        "!**/.*.js",
        "!**/*.config.js",
    ],
};
