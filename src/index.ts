#!/usr/bin/env node

import { spawn } from "child_process";
import * as fs from "fs";
import * as tar from "tar";
import { promisify } from "util";

import {
    binaryPath,
    downloadFile,
    downloadUrl,
    getReleaseArchiveNameForCurrentPlatform,
    isFile,
    removeFile
} from "./utils";

const archiveName: string = getReleaseArchiveNameForCurrentPlatform();

const doStuff = async () => {
    if (isFile(binaryPath())) {
        execute();
        return;
    }

    const myFile = await downloadFile(
        downloadUrl("0.0.3", archiveName),
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
                // Print error
            });
    });
};

const execute = () => {
    const ecProcess = spawn(`${binaryPath()}`);

    ecProcess.stdout.on("data", data => {
        // tslint-disable
        console.log(`${data}`);
        // tslint-enable
    });

    ecProcess.stderr.on("data", data => {
        // tslint-disable
        console.log(`${data}`);
        // tslint-enable
    });

    ecProcess.on("close", code => {
        if (code !== 0) {
            // process.exit(code)
        }
    });
};

doStuff();
