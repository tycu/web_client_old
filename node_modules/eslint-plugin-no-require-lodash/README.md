# eslint-plugin-no-require-lodash

Prevent require('lodash') in order to encourage things like require('lodash/collection/map').

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-require-lodash`:

```
$ npm install eslint-plugin-no-require-lodash --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-require-lodash` globally.

## Usage

Add `no-require-lodash` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-require-lodash"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-require-lodash/no-require-lodash": 2
    }
}
```


