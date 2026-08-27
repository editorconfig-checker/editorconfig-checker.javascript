import fs from "node:fs/promises"
import path from "node:path"

import { NAME } from "./constants"

export async function findProgram(directory: string, platform: string) {
  const executableName = platform === "win32" ? `${NAME}.exe` : NAME
  const currentProgram = path.join(directory, executableName)
  if (await exists(currentProgram)) {
    return currentProgram
  }
  const legacyBinPath = path.join(directory, "bin")
  const [legacyName] = await fs.readdir(legacyBinPath)
  return path.join(legacyBinPath, legacyName)
}

async function exists(filePath: string) {
  try {
    await fs.stat(filePath)
    return true
  } catch {
    return false
  }
}
