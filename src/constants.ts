import path from "node:path"

export const NAME = "editorconfig-checker"
export const VERSION = process.env.EC_VERSION ?? "latest"
export const CWD = path.join(import.meta.dirname, "..")
export const BIN_PATH = path.join(CWD, "bin")
export const COMBINED_PATH = path.join(BIN_PATH, VERSION)
