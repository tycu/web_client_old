module.exports = {
    "env": {
        "browser": false,
        "commonjs": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "./node_modules/eslint-config-bestpractices/index.js",
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": false
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {}
};