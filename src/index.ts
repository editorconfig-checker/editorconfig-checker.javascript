#!/usr/bin/env node

import { spawn } from "child_process";
import * as tar from "tar";
import fs from "fs";
import util from "util";

import {
    binary,
    downloadFile,
    downloadUrl,
    ecRootDir,
    getReleaseArchiveNameForCurrentPlatform,
    isFile,
    removeFile,
    getAvailableVersions,
    getVersionFromConfigFile,
    getReleaseNameForCurrentPlatform,
} from "./lib";

const mkdir = util.promisify(fs.mkdir);
const rename = util.promisify(fs.rename);

const execute = (version: string) => {
    const ecProcess = spawn(`${binary(version)}`, process.argv.slice(2));

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
    // TODO: force reload
    // TODO: autocheck for new version
    // TODO: skip autocheck for now version
    const versions = await getAvailableVersions();
    let version = await getVersionFromConfigFile();

    if (!versions.includes(version)) {
        if (typeof version === "undefined") {
            // get newest version
            version = versions[versions.length - 1];
        } else {
            console.log(`No version ${version} available`);
            return;
        }
    }

    if (isFile(binary(version))) {
        execute(version);
        return;
    }

    const tarFilePath = `${ecRootDir()}/ec.tar.gz`;

    const myFile = await downloadFile(
        downloadUrl(version, getReleaseArchiveNameForCurrentPlatform()),
        tarFilePath
    );

    myFile.once("close", () => {
        tar.x({
            C: ecRootDir(),
            cwd: ecRootDir(),
            file: tarFilePath,
            strict: true,
        })
            .then(async (_) => {
                removeFile(tarFilePath);
                await mkdir(`${ecRootDir()}/bin/${version}`);
                await rename(
                    `${ecRootDir()}/bin/${getReleaseNameForCurrentPlatform()}`,
                    binary(version)
                );
                execute(version);
            })
            .catch((e) => {
                console.error("ERROR:", e);
            });
    });
})().catch((e) => {
    console.error("ERROR:", e);
    process.exit(1);
});
