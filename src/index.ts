#!/usr/bin/env node

import { spawn } from "child_process";
import * as tar from "tar";
import fs from "fs";
import util from "util";
import rimraf from "rimraf";

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
    getSkipUpdateCheckFromConfigFile,
} from "./lib";

const mkdir = util.promisify(fs.mkdir);
const rename = util.promisify(fs.rename);

const FLAGS = ["--reload", "--clean", "--skip-update-check"];

const execute = (version: string) => {
    const ecProcess = spawn(
        `${binary(version)}`,
        process.argv.slice(2).filter((i) => !FLAGS.includes(i))
    );

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
    if (process.argv.includes("--help")) {
        console.log("wrapper specific arguments: ");
        console.log("\t--reload\tredownloads the binary");
        console.log("\t--clean\tdeletes all cached files");
    }

    const versions = await getAvailableVersions();
    const latestVersion = versions[versions.length - 1];
    let version = await getVersionFromConfigFile();

    const reload = process.argv.includes("--reload");
    const clean = process.argv.includes("--clean");
    const skipUpdateCheck =
        process.argv.includes("--skip-update-check") ||
        (await getSkipUpdateCheckFromConfigFile());

    if (clean) {
        rimraf.sync(`${ecRootDir()}/bin`);
        return;
    }

    if (!versions.includes(version)) {
        if (typeof version === "undefined") {
            version = latestVersion;
        } else {
            console.log(`No version ${version} available`);
            return;
        }
    }

    if (!skipUpdateCheck && latestVersion !== version) {
        console.warn(`There is a new version available: ${latestVersion}`);
        console.warn(`You are using: ${version}`);
    }

    if (!reload && isFile(binary(version))) {
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
                await mkdir(`${ecRootDir()}/bin/${version}`, {
                    recursive: true,
                });
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
