import { Octokit } from '@octokit/rest'
import { writeFile } from 'fs/promises'
import fetch from 'node-fetch'
import os from 'os'
import { extract } from 'tar'
import tmp from 'tmp-promise'
import { COMBINED_PATH, NAME } from './constants'

const octokit = new Octokit()

export async function findRelease(version: string) {
  const release = await getRelease(version)
  const releasePrefix = getAssetPrefix()
  const matchedAsset = release.data.assets.find(({ name }) => {
    return name.startsWith(releasePrefix) && name.endsWith('.tar.gz')
  })
  if (!matchedAsset) {
    throw new Error(`The binary '${releasePrefix}*' not found`)
  }
  return [release.data.name, matchedAsset] as const
}

export async function downloadBinary(url: string) {
  const response = await fetch(url)
  const tmpfile = await tmp.file()
  await writeFile(tmpfile.path, await response.buffer())
  await extract({ file: tmpfile.path, cwd: COMBINED_PATH, strict: true })
  await tmpfile.cleanup()
}

function getRelease(version: string) {
  const { getLatestRelease, getReleaseByTag } = octokit.rest.repos
  if (version === 'latest') {
    return getLatestRelease({ owner: NAME, repo: NAME })
  }
  return getReleaseByTag({ owner: NAME, repo: NAME, tag: version })
}

function getAssetPrefix() {
  let platform: string = os.platform()
  if (platform === 'win32') {
    platform = 'windows'
  }
  let arch: string = os.arch()
  if (arch === 'x32') {
    arch = '386'
  } else if (arch === 'x64') {
    arch = 'amd64'
  }
  return `ec-${platform}-${arch}`
}
