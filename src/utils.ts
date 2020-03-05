import * as fs from "fs";
import * as os from "os";
import fetch from "node-fetch";

export const getReleaseArchiveNameForCurrentPlatform = (): string => {
    return `${getReleaseNameForCurrentPlatform()}.tar.gz`;
};

export const platform: () => string = () => {
    const currentPlatform = os.platform();

    if (currentPlatform === "win32") {
        return "windows";
    } else {
        return currentPlatform;
    }
};

export const arch: () => string = () => {
    const currentArch = os.arch();

    if (currentArch === "x32") {
        return "386";
    } else if (currentArch === "x64") {
        return "amd64";
    }

    return currentArch;
};

export const getReleaseNameForCurrentPlatform = (): string => {
    return `ec-${platform()}-${arch()}${
        platform() === "windows" ? ".exe" : ""
    }`;
};

export const ecRootDir = (): string => {
    return `${__dirname}/..`;
};

export const binaryPath = (): string => {
    return `${ecRootDir()}/bin`;
};

export const binary = (): string => {
    return `${binaryPath()}/${getReleaseNameForCurrentPlatform()}`;
};

export const isFile = (path: string): boolean => {
    try {
        fs.statSync(path).isFile();

        return true;
    } catch (e) {
        return false;
    }
};

export const downloadUrl = (version: string, archiveName: string): string => {
    let releaseUrl: string;
    releaseUrl =
        "https://github.com/editorconfig-checker/editorconfig-checker/releases/download/";

    return `${releaseUrl}/${version}/${archiveName}`;
};

export const downloadFile = (
    url: string,
    dest: string
): Promise<fs.WriteStream> => {
    if (isFile(dest)) {
        fs.unlinkSync(dest);
    }

    return fetch(url).then(res => res.body.pipe(fs.createWriteStream(dest)));
};

export const removeFile = (path: string): void => {
    fs.unlinkSync(path);

    return;
};
