// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo", "prettier", "plugin:jest/recommended"],
    plugins: ["prettier", "jest"],
    rules: {
        "prettier/prettier": ["warn"],
        "import/no-unresolved": "off", // Pour éviter les erreurs sur les imports non résolus comme `@env`
    },
};
