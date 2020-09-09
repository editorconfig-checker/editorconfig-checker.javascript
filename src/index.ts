#!/usr/bin/env node

import { spawn } from "child_process";
import * as tar from "tar";

import {
    binary,
    downloadFile,
    downloadUrl,
    ecRootDir,
    getReleaseArchiveNameForCurrentPlatform,
    isFile,
    removeFile,
} from "./utils";

const CORE_VERSION = "2.1.0";

const execute = () => {
    const ecProcess = spawn(`${binary()}`, process.argv.slice(2));

    ecProcess.stdout.on("data", (data) => {
        console.log(`${data}`);
    });

    ecProcess.stderr.on("data", (data) => {
        console.error(`${data}`);
    });

    ecProcess.on("close", (code) => {
        if (code !== 0) {
            process.exit(code);
        }
    });
};

(async () => {
    if (isFile(binary())) {
        execute();
        return;
    }

    const tarFilePath = `${ecRootDir()}/ec.tar.gz`;

    const myFile = await downloadFile(
        downloadUrl(CORE_VERSION, getReleaseArchiveNameForCurrentPlatform()),
        tarFilePath
    );

    myFile.once("close", () => {
        tar.x({
            C: ecRootDir(),
            cwd: ecRootDir(),
            file: tarFilePath,
            strict: true,
        })
            .then((_) => {
                removeFile(tarFilePath);
                execute();
            })
            .catch((e) => {
                console.error("ERROR:", e);
            });
    });
})().catch((e) => {
    console.error("ERROR:", e);
    process.exit(1);
});
