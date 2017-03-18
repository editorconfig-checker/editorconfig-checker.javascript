#!/usr/bin/env bash

cp -f Build/GitHooks/pre-commit .git/hooks/ && chmod +x .git/hooks/pre-commit
