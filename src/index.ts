#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import { COMBINED_PATH, VERSION } from './constants'
import { spawnSync } from 'child_process'
import { downloadBinary, findRelease } from './release'

async function main() {
  if (!(await isReady())) {
    const [name, assets] = await findRelease(VERSION)
    console.info(`Downloading v${name}`)
    await downloadBinary(assets.browser_download_url)
  }
  await execute()
}

main().catch(console.error)

async function execute() {
  const [name] = await fs.readdir(COMBINED_PATH)
  const program = path.join(COMBINED_PATH, name)
  await fs.chmod(program, 0o755)
  const { status } = spawnSync(program, process.argv.slice(2), {
    stdio: 'inherit',
    env: process.env,
  })
  process.exit(status ?? 0)
}

async function isReady() {
  try {
    await fs.stat(COMBINED_PATH)
    return true
  } catch {
    await fs.mkdir(COMBINED_PATH, { recursive: true })
    return false
  }
}
