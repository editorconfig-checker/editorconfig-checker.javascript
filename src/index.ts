#!/usr/bin/env node

import { downloadFile, downloadUrl, getReleaseArchiveNameForCurrentPlatform } from "./utils";

const archiveName: string = getReleaseArchiveNameForCurrentPlatform();

// TODO: Get version from self
const success: boolean = downloadFile(downloadUrl("0.0.3", archiveName), "ec.tar.gz");
