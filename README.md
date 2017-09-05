# editorconfig-checker

![Logo](https://raw.githubusercontent.com/editorconfig-checker/editorconfig-checker.javascript/master/Docs/logo.png "Logo")

[![Build Status](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript.svg?branch=master)](https://travis-ci.org/editorconfig-checker/editorconfig-checker.javascript)
[![Coverage Status](https://coveralls.io/repos/github/editorconfig-checker/editorconfig-checker.javascript/badge.svg?branch=master)](https://coveralls.io/github/editorconfig-checker/editorconfig-checker.javascript?branch=master)
[![dependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?view=list)
[![devDependencies](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript/dev-status.svg)](https://david-dm.org/editorconfig-checker/editorconfig-checker.javascript?type=dev&view=list)
[![Greenkeeper badge](https://badges.greenkeeper.io/editorconfig-checker/editorconfig-checker.javascript.svg)](https://greenkeeper.io/)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


## Installation

Installation via npm/yarn is recommended:

```
yarn add editorconfig-checker.javascript
./node_modules/.bin/editorconfig-checker

npm install --save-dev editorconfig-checker.javascript
./node_modules/.bin/editorconfig-checker

# or in a npm-script just
editorconfig-checker
```

Otherwise you could clone the repository and execute the script manually.

```
git clone git@github.com:editorconfig-checker/editorconfig-checker.javascript.git
./editorconfig-checker.javascript/bin/editorconfig-checker
```

## Usage

If you installed it via npm you have a binary in your `node_modules/.bin` folder called `editorconfig-checker`.
Then you could create a script in your `package.json` like this:

```json
"scripts": {
    "lint:editorconfig": "editorconfig-checker src"
}
```

Or to check multiple directories you could use it like this:

```json 
"scripts": {
    "lint:editorconfig": "editorconfig-checker src someOhterDir anohterDir"
}
```

If no directory is given the current working directory will be used.

If you want to filter the files you could do this via the `-e|--exclude` parameter

If you use a regular expression you should __always__ put single quotes around it
because the special characters(e.g. `|`, `*`, `.` or whatever) will be interpreted by your shell before if you don't.

Some examples:
```sh
# will filter all files with json extension
editorconfig-checker -e '\\.json$' 
editorconfig-checker --exclude '\\.json$'

# will only filter all files which has TestFiles in their name
editorconfig-checker -e TestFiles
editorconfig-checker --exclude TestFiles 

# will filter all files which has TestFiles in their name and json as extension
editorconfig-checker -e 'TestFiles|\\.json$'
editorconfig-checker --exclude 'TestFiles|\\.json$'

# will filter all files which has TestFiles in their name and exclude dotfiles
editorconfig-checker -d -e TestFiles 
editorconfig-checker --dotfiles --exclude TestFiles  

# will filter all files which has TestFiles in their name and exclude dotfiles and will try to fix issues if they occur
editorconfig-checker -d -e TestFiles 
editorconfig-checker --dotfiles --exclude TestFiles 

# will don't use default excludes and filter all files which has TestFiles in their name
editorconfig-checker -i -d -e TestFiles
editorconfig-checker --ignore-defaults --dotfiles --exclude TestFiles 
```

If you just want to filter for one string you don't have to worry and if you want to filter for more strings you could also pass the `-e|--exclude` option more than once like this:

```sh
./node_modules/.bin/editorconfig-checker -e node_modules -e myBinary -e someGeneratedFile -e myPicture 
./node_modules/.bin/editorconfig-checker --exclude node_modules --exclude myBinary --exclude someGeneratedFile --exclude myPicture 
```

If you installed it manually you would have to do something like this:

```sh
<PATH/TO/ROOT/OF/THIS/REPOS>/bin/editorconfig-checker src
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
-e <PATTERN>, --exclude <PATTERN>
    string or regex to filter files which should not be checked
-i, --ignore-defaults
    will ignore default excludes, see README for details
-h, --help
    will print this help text
-l, --list-files
    will print all files which are checked to stdout
```


## Default ignores:

```
'vendor',
'node_modules',
'coverage',
'\.git',
'\.DS_Store',
'\.gif$',
'\.png$',
'\.bmp$',
'\.jpg$',
'\.svg$',
'\.ico$',
'\.lock$',
'\.eot$',
'\.woff$',
'\.woff2$',
'\.ttf$',
'\.bak$',
'\.bin$',
'\.min.js$',
'\.min.css$',
'\.pdf$',
'\.jpeg$'
```

Suggestions are welcome!

## Additional Notes

I use semantic versioning so every breaking change will result in the increase of the major version.

If you encounter any bugs or anything else please open an issue with as many details as possible.

You should use the `-l` option after installing and configuring this tool to see if all files are
checked.
