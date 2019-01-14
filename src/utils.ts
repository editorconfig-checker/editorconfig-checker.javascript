import * as os from "os";

export function getEcBinaryName(): string {
    const arch = os.arch();
    const platform = os.platform();

    switch (arch) {
        case "smth":
            return `ec-${platform}-${arch}`;
            break;

        default:
            return `ec-${platform}-amd64`;
    }
}

export function downloadUrl(binaryName: string, version: string): string {
    const releaseUrl: string = "https://github.com/editorconfig-checker/editorconfig-checker/releases/tag";
    return `${releaseUrl}/${version}/${binaryName}.tar.gz`;
}

export function downloadFile(url: string, dest: string): boolean {
    return true;
}
