import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as os from "os";
import * as request from "request";

export const getReleaseArchiveNameForCurrentPlatform = (): string => {
    return `${getReleaseNameForCurrentPlatform()}.tar.gz`
};

export const getReleaseNameForCurrentPlatform = (): string => {
    const arch: string = os.arch();
    const platform: string = os.platform();

    // TODO: get correct archive names
    switch (arch) {
        case "smth":
            return `ec-${platform}-${arch}`;
            break;

        default:
            return `ec-${platform}-amd64`;
    }
}

export const binaryPath = (): string => {
    return `./bin/${getReleaseNameForCurrentPlatform()}`
}

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

export const downloadFile = (url: string, dest: string): fs.WriteStream => {
    if (isFile(dest)) {
        fs.unlinkSync(dest);
    }

    const requestWithUserAgent: request.RequestAPI<
        request.Request,
        request.CoreOptions,
        request.RequiredUriUrl
    > = request.defaults({
        headers: {
            "User-Agent": "editorconfig-checker"
        }
    });

    return requestWithUserAgent.get(url).pipe(fs.createWriteStream(dest));
};

export const removeFile = (path: string): void => {
    fs.unlinkSync(path);

    return;
};
