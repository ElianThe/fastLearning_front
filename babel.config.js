// fichier de configuration pour convertir du code js/ts en une version compatible
// avec les environnements js + anciens, tels que des navigateurs + anciens
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // ensemble de configurations de plugins prédéfinis qui aident Babel à transformer le code
        plugins: [ // liste les plugins Babel utilisés pour ajouter ou personnaliser des fonctionnalités spécifiques lors de la compilation du code
            ['module:react-native-dotenv', // permet d'importer des variables d'environnement définies dans un fichier .env
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                    whitelist: ['API_URL', 'TOKEN_KEY'],
                    safe: false,
                    allowUndefined: true,
                }
            ],
            'react-native-reanimated/plugin'
        ]
    };
};
