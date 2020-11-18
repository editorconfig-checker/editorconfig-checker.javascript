import * as fs from "fs";
import * as os from "os";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
import util from "util";

const readFile = util.promisify(fs.readFile);

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

export const binary = (version: string): string => {
    return `${binaryPath()}/${version}/${getReleaseNameForCurrentPlatform()}`;
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

export const downloadFile = async (
    url: string,
    dest: string
): Promise<fs.WriteStream> => {
    if (isFile(dest)) {
        fs.unlinkSync(dest);
    }
    const proxy = process.env.https_proxy || process.env.http_proxy || "";

    return fetch(url, {
        agent: proxy ? (new HttpsProxyAgent(proxy) as any) : null,
    }).then((res) => res.body.pipe(fs.createWriteStream(dest)));
};

export const removeFile = (path: string): void => {
    fs.unlinkSync(path);

    return;
};

export const getAvailableVersions = async (): Promise<string[]> => {
    const proxy = process.env.https_proxy || process.env.http_proxy || "";

    const response = await fetch(
        "https://api.github.com/repos/editorconfig-checker/editorconfig-checker/git/refs/tags",
        {
            agent: proxy ? (new HttpsProxyAgent(proxy) as any) : null,
        }
    );

    const buffer = await response.buffer();
    const json = JSON.parse(buffer.toString());

    const versions = json
        .map((i) => i.ref.substring("refs/tags/".length))
        .sort();

    return versions;
};

export const getVersionFromConfigFile = async (): Promise<string> => {
    const config = JSON.parse(
        (await readFile(`${process.cwd()}/.ecrc`)).toString()
    );

    return config.Version;
};
