#!/usr/bin/env bash

yarn test:coverage && ./node_modules/coveralls/bin/coveralls.js < ./coverage/lcov.info
