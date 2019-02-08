#!/usr/bin/env node

import { spawn } from "child_process";
import * as fs from "fs";
import * as tar from "tar";
import { promisify } from "util";

import * as packageJson from '../package.json';

import {
    binaryPath,
    downloadFile,
    downloadUrl,
    getReleaseArchiveNameForCurrentPlatform,
    isFile,
    removeFile
} from "./utils";

const archiveName: string = getReleaseArchiveNameForCurrentPlatform();

const execute = () => {
    const ecProcess = spawn(`${binaryPath()}`, process.argv.slice(2));

    ecProcess.stdout.on("data", data => {
        console.log(`${data}`);
    });

    ecProcess.stderr.on("data", data => {
        console.error(`${data}`);
    });

    ecProcess.on("close", code => {
        if (code !== 0) {
            process.exit(code);
        }
    });
};

(async () => {
    if (isFile(binaryPath())) {
        execute();
        return;
    }

    const myFile = await downloadFile(
        // TODO: get version from package.json
        downloadUrl(packageJson.ecVersion, archiveName),
        "ec.tar.gz"
    );

    myFile.once("close", () => {
        tar.x({
            file: `ec.tar.gz`,
            strict: true
        })
            .then(_ => {
                removeFile("ec.tar.gz");
                execute();
            })
            .catch(e => {
                console.error("ERROR:", e);
            });
    });
})();
