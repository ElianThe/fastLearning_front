// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": ["warn"],
        "import/no-unresolved": "off", // Pour éviter les erreurs sur les imports non résolus comme `@env`
    },
};
