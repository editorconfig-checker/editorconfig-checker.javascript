#!/usr/bin/env bash

xo --ignore=Build/TestFiles/{ValidationProcessor,DisablingRules}/*.js && yarn lint:self
