# Changelog

## Unreleased

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

### Misc

## [4.0.2] - 2021-03-31

- Update Core to 2.3.5

### Misc

- Switch to Github Actions [#228](https://github.com/editorconfig-checker/editorconfig-checker.javascript/pull/228) ([@mstruebing](https://github.com/mstruebing))

## [4.0.1] - 2021-03-16

- Rollback own package manager configuration via version in config file

## [3.3.0] - 2020-10-20

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.2.0

## [3.2.0] - 2020-09-11

- add proxy option and throw error if download fails [#203](https://github.com/editorconfig-checker/editorconfig-checker.javascript/pull/203) ([@bufferoverflow](https://github.com/bufferoverflow))

## [3.1.0] - 2020-06-07

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.1.0

## [3.0.5] - 2020-05-18

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.0.4

## [3.0.4] - 2020-03-05

- Exchange deprecated `request`-package with `node-fetch` [#141](https://github.com/editorconfig-checker/editorconfig-checker.javascript/pull/141) ([@mstruebing](https://github.com/mstruebing))

## [3.0.3] - 2019-08-19

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.0.3

## [3.0.2] - 2019-08-19

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.0.2

## [3.0.1] - 2019-08-18

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.0.1

## [3.0.0] - 2019-08-18

!!!BREAKING
see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/2.0.0

### Misc

- update some minor versions

## [2.2.0] - 2019-08-06

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.3.0

### Misc

- update to node v12

## [2.1.1] - 2019-07-06

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.2.1

## [2.1.0] - 2019-05-02

see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.2.0

## [2.0.8] - 2019-04-21

### Misc

- Add some not needed folders/files to `.npmignore` to make the release smaller
- Adjust `.nvmrc` to reflect current `@types/node` version

## [2.0.7] - 2019-04-20

### Added

- better release process through `make release`

### Fixed

- exchange deprecated `prepublish` script with `prepare`
- insert_final_newline behavior according to specification (https://github.com/editorconfig-checker/editorconfig-checker/pull/56)

## [2.0.6] - 2019-03-16

## Fixed

- use `CGO_ENABLED=0` to let Go binary run on alpine

## [2.0.5] - 2019-03-01

## Fixed

- Use `.exe` binary for windows again

## [2.0.4] - 2019-03-01

## Fixed

- Use `.exe` binary for windows

## [2.0.2] - 2019-03-01

## Fixed

- Updated core for windows compatibility see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.1.1

## [2.0.1] - 2019-02-27

## BREAKING

- use [editorconfig-checker](https://github.com/editorconfig-checker/editorconfig-checker) as core and only have a typescript wrapper.

## [1.4.0] - 2019-02-16

## Added

- alias from `editorconfig-checker` to `ec`

## Removed

- unused dependency with security issue (glob-fs) thanks to [Ruxandra Fediuc](https://github.com/ruxandrafed)

## Updated

- xo to 0.24.0 and adjusted code style
