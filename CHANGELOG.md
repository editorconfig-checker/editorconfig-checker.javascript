# Changelog

## Unreleased
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
### Misc
* update to node v12


## [2.1.1] - 2019-07-06
see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.2.1

## [2.1.0] - 2019-05-02
see: https://github.com/editorconfig-checker/editorconfig-checker/releases/tag/1.2.0

## [2.0.8] - 2019-04-21
### Misc
* Add some not needed folders/files to `.npmignore` to make the release smaller
* Adjust `.nvmrc` to reflect current `@types/node` version

## [2.0.7] - 2019-04-20
### Added
* better release process through `make release`
### Fixed
* exchange deprecated `prepublish` script with `prepare`
* insert_final_newline behavior according to specification (https://github.com/editorconfig-checker/editorconfig-checker/pull/56)


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

