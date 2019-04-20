################################################################################
# Variables
################################################################################


# Add node_modules binaries to $PATH
export PATH := ./node_modules/.bin:$(PATH)

BIN_FILE = "./dist/index.js"

GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
GIT_BRANCH_UP_TO_DATE = $(shell git remote show origin | tail -n1 | sed 's/.*(\(.*\))/\1/')
CURRENT_CORE_VERSION = $(shell grep 'const CORE_VERSION' src/index.ts | sed 's/.*"\(.*\)";/\1/')
CURRENT_SELF_VERSION = $(shell grep '"version":' package.json | sed 's/.*"\(.*\)",/\1/')


.DEFAULT:
info:
	@printf "\n"
	@printf "\033[0;1m Editorconfig-Checker\033[0m\n"
	@printf "\n"
	@printf " Available Targets\n"
	@printf " -----------------------------------------------------------------------------------------\n"
	@printf "\033[0;1m setup \033[0m \t\t set's up the project\n"
	@printf "\033[0;1m build \033[0m \t\t build's the project\n"
	@printf "\033[0;1m build-watch \033[0m \t\t watches the source files for changes and rebuilds on every change\n"
	@printf "\033[0;1m test \033[0m \t\t\t executes the tests\n"
	@printf "\033[0;1m test-coverage \033[0m \t shows the test coverage\n"
	@printf "\033[0;1m lint \033[0m \t\t\t lints all source files\n"
	@printf "\033[0;1m lint-self \033[0m \t\t executes the editorconfig-checker on itself\n"
	@printf "\033[0;1m clean \033[0m \t\t deletes the node_modules and dist folders\n"
	@printf "\033[0;1m release \033[0m \t\t Does everything needed regarding a release\n"
	@printf "\n"


################################################################################
# Setup
################################################################################


install: install-git-hook
	npm install

install-git-hook:
	cd ./.git/hooks/ && ln -sf ../../Build/GitHooks/pre-commit .

setup: install build


################################################################################
# Builds
################################################################################


build: clean-dist
	tsc && \
	chmod +x $(BIN_FILE)

build-watch:
	tsc --watch

run: build
	$(BIN_FILE)


################################################################################
# Code Quality
################################################################################


test:
	# jest src

test-coverage:
	# jest --coverage src

test-coverage-publish:
	# $(MAKE) test-coverage && ./node_modules/coveralls/bin/coveralls.js < ./coverage/lcov.info

test-watch:
	# jest --watch src


lint: lint-prettier lint-ts lint-self

lint-ts:
	tslint --project tsconfig.json ./src/**/*.ts

lint-fix:
	tslint --fix --project tsconfig.json ./src/**/*.ts

lint-prettier:
	prettier --check ./src/**/*

lint-self: build
	$(BIN_FILE)


################################################################################
# Misc
################################################################################


publish: clean install build lint test
	npm publish

clean:
	rm -Rf ./{dist,node_modules,bin}

clean-dist:
	rm -Rf ./dist


release: _is_master_branch _git_branch_is_up_to_date _current_version _do_release
	echo Release done. Go to Github and create a release.

_is_master_branch:
ifneq ($(GIT_BRANCH),master)
	@echo You are not on the master branch.
	@echo Please check out the master and try to release again
	@false
endif

_git_branch_is_up_to_date:
ifneq ($(GIT_BRANCH_UP_TO_DATE),up to date)
	@echo Your master branch is not up to date.
	@echo Please push your changes or pull changes from the remote.
	@false
endif

_current_version:
	@echo the current core version is: $(CURRENT_CORE_VERSION)
	@echo the current self version is: $(CURRENT_SELF_VERSION)

_do_release: clean install test build run _tag_version publish

_tag_version:
	@read -p "Enter core version to release: " core_version && \
	read -p "Enter self version to release: " self_version && \
	sed -i "s/const CORE_VERSION = \".*\";/const CORE_VERSION = \"$${core_version}\";/" ./src/index.ts && \
	sed -i "s/\"version\":.*\",/\"version\": \"$${self_version}\",/" ./package.json && \
	git add . && git commit -m "chore(release): $${self_version}" && git tag "$${self_version}" && \
	git push origin master && git push origin master --tags
