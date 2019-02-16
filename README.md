# editorconfig-checker

![Logo](https://raw.githubusercontent.com/editorconfig-checker/editorconfig-checker.javascript/master/Docs/logo.png "Logo")

[![Build Status](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript.svg?branch=master)](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript)
[![Coverage Status](https://coveralls.io/repos/github/editorconfig-checker/editorconfig-checker.javascript/badge.svg?branch=master)](https://coveralls.io/github/editorconfig-checker/editorconfig-checker.javascript?branch=master)
[![dependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?view=list)
[![devDependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/dev-status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?type=dev&view=list)
[![Greenkeeper badge](https://badges.greenkeeper.io/editorconfig-checker/editorconfig-checker.javascript.svg)](https://greenkeeper.io/)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## What?

This is a tool to check if your files consider your `.editorconfig`.
Most tools - like linters for example - only test one filetype and need an extra configuration.
This tool only needs your editorconfig to check all files.



![Sample Output](https://raw.githubusercontent.com/editorconfig-checker/editorconfig-checker.javascript/master/Docs/sample.png "Sample output")


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
    "lint:editorconfig": "editorconfig-checker src"
}
```

To check multiple directories you could use it like this:

```json
"scripts": {
    "lint:editorconfig": "editorconfig-checker src someOhterDir anohterDir"
}
```

You could also use a glob to check your files:

```json
"scripts": {
    "lint:editorconfig": "editorconfig-checker ./src/{editorconfig,logger}/**/*"
}
```


If no directory is given the current working directory will be used as root and all files will be checked.

If you want to filter the files you could do this via the `exclude-pattern` or `--exclude-regexp` parameter

**ATTENTION**: `--exclude-pattern` will be way faster especially in bigger projects because it prefilters the files, in contrast `--exclude--regexp` will first collect all files and filter them after.

If you use a regular expression you should __always__ put single quotes around it
because the special characters(e.g. `|`, `*`, `.` or whatever) will be interpreted by your shell before if you don't.

Some examples:
```sh
# will filter all files with json extension
editorconfig-checker --exclude-pattern './**/*.json'
editorconfig-checker --exclude-regexp '\\.json$'

# will filter all files which has TestFiles in their name and json as extension
editorconfig-checker --exclude-pattern './**/*TestFiles*/*' --exclude-pattern './**/*.json'
editorconfig-checker --exclude-regexp 'TestFiles|\\.json$'

# will don't use default excludes and filter all files which has TestFiles in their name
editorconfig-checker -i -d --exclude-pattern './**/*TestFiles*/*'
editorconfig-checker --ignore-defaults --dotfiles --exclude-regexp 'TestFiles'
```

If you just want to filter for one string you don't have to worry and if you want to filter for more strings you could also pass the `--exclude-regexp|--exclude-pattern` option more than once like this:

```sh
./node_modules/.bin/editorconfig-checker --exclude-regexp node_modules --exclude-regexp myBinary --exclude-regexp someGeneratedFile --exclude-regexp myPicture
./node_modules/.bin/editorconfig-checker --exclude-pattern './node_modules/**' --exclude-pattern './myBinary' --exclude-pattern './dist/someGeneratedFile' --exclude-pattern './pictures/myPicture'
```

If you installed it manually you would have to do something like this:

```sh
<PATH/TO/ROOT/OF/THIS/REPOS>/dist/index.js src
```

The exit value is 0 if no error occurred and 1 to 254 - every error adds 1 to the exit value.
255 means that there is more than 254 violations of your `.editorconfig` rules.

Usage output:
```
Usage:
editorconfig-checker [OPTIONS] <DIRECTORY>
available options:
-d, --dotfiles
    use this flag if you want to exclude dotfiles
--exclude-pattern <PATTERN>');
    pattern to filter files which should not be checked');
--exclude-regexp <REGEXP>');
    regex to filter files which should not be checked');
-i, --ignore-defaults
    will ignore default excludes, see README for details
-h, --help
    will print this help text
-l, --list-files
    will print all files which are checked to stdout
```

### Disabling single lines

It is possible to disable single lines with placing a comment - or theoretically
any other string which includes `editorconfig-disable-line` on that line.

Example as it is working now:

```
    const x = 'this constant is indented false'; // editorconfig-disable-line
```

### Disabling files

It is possible to disable files with placing a comment - or theoretically
any other string which includes `editorconfig-disable-file` on the *first line*.

Example as it is working now:

```
// editorconfig-disable-file
    const x = 'this constant is indented false';
    ...
    const y = 'everything is indented false';
```


## Default ignores:

```
'./**/vendor/**/*',
'./**/node_modules/**/*',
'./**/coverage/**/*',
'./**/.DS_Store/**/*',
'./.git/**',
'./**/*.gif',
'./**/*.png',
'./**/*.bmp',
'./**/*.jpg',
'./**/*.svg',
'./**/*.ico',
'./**/*.lock',
'./**/*.eot',
'./**/*.woff',
'./**/*.woff2',
'./**/*.ttf',
'./**/*.bak',
'./**/*.bin',
'./**/*.min.js',
'./**/*.min.css',
'./**/*.pdf',
'./**/*.jpeg'
```

Suggestions are welcome!

## Additional Notes

I use semantic versioning so every breaking change will result in the increase of the major version.

If you encounter any bugs or anything else please open an issue with as many details as possible.

You should use the `-l` option after installing and configuring this tool to see if all files are
checked.


## Support

If you have any questions or just want to chat join #editorconfig-checker on
freenode(IRC).
If you don't have an IRC-client set up you can use the
[freenode webchat](https://webchat.freenode.net/?channels=editorconfig-checker).
