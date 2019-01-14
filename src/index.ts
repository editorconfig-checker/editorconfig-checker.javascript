#!/usr/bin/env node

import {downloadFile, downloadUrl, getEcBinaryName} from "./utils";

const ecBinaryName = getEcBinaryName();
const success = downloadFile(downloadUrl(ecBinaryName, "0.0.3"), "ec.tar.gz");
