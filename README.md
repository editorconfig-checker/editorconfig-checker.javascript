# editorconfig-checker

![Logo](https://raw.githubusercontent.com/editorconfig-checker/editorconfig-checker.javascript/master/Docs/logo.png "Logo")

[![Build Status](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript.svg?branch=master)](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript)
[![dependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?view=list)
[![devDependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/dev-status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?type=dev&view=list)
[![Greenkeeper badge](https://badges.greenkeeper.io/editorconfig-checker/editorconfig-checker.javascript.svg)](https://greenkeeper.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/editorconfig-checker/editorconfig-checker.javascript.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/editorconfig-checker/editorconfig-checker.javascript/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/editorconfig-checker/editorconfig-checker.javascript.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/editorconfig-checker/editorconfig-checker.javascript/context:javascript)

## What?

This is a tool to check if your files consider your `.editorconfig`.
Most tools - like linters for example - only test one filetype and need an extra configuration.
This tool only needs your editorconfig to check all files.

![Sample Output](https://raw.githubusercontent.com/editorconfig-checker/editorconfig-checker.javascript/master/Docs/sample.png "Sample output")

## Important

This is only a wrapper for the core [editorconfig-checker](https://github.com/editorconfig-checker/editorconfig-checker). 
You should have a look at this repository to know how this tool can be used and what possibilities/caveats are there.
This version can be used in the same way as the core as every argument is simply passed down to it.

## Installation

Installation via npm/yarn is recommended:

```
yarn add --dev editorconfig-checker
./node_modules/.bin/editorconfig-checker

npm install --save-dev editorconfig-checker
./node_modules/.bin/editorconfig-checker

# or in a npm-script just
editorconfig-checker
```

Otherwise you could clone the repository and execute the script manually.

```
git clone git@github.com:editorconfig-checker/editorconfig-checker.javascript.git
&& cd editorconfig-checker.javascript
&& make setup
&& ./editorconfig-checker.javascript/dist/index
```

## Usage

There is an alias from `editorconfig-checker` to `ec` so you can exchange every occurrence of `editorconfig-checker` with `ec`.

If you installed it via npm you have a binary in your `node_modules/.bin` folder called `editorconfig-checker`.
Then you could create a script in your `package.json` like this:

```json
"scripts": {
    "lint:editorconfig": "editorconfig-checker"
}
```

Usage output:

```
USAGE:
    -e string
        a regex which files should be excluded from checking - needs to be a valid regular expression
    -exclude string
        a regex which files should be excluded from checking - needs to be a valid regular expression
    -h    print the help
    -help
        print the help
    -i    ignore default excludes
    -ignore
        ignore default excludes
    -v    print debugging information
    -verbose
        print debugging information
    -version
        print the version number
```

## Support

If you have any questions or just want to chat join #editorconfig-checker on
freenode(IRC).
If you don't have an IRC-client set up you can use the
[freenode webchat](https://webchat.freenode.net/?channels=editorconfig-checker).
