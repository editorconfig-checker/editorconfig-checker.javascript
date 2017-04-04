#!/usr/bin/env bash

jest --coverage src && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
