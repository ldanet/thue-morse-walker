module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": "off", //not sure about them yet
        "react/no-array-index-key": "off", //keys are not important enough to care
    }
};
