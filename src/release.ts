import os from "node:os"

import { Octokit } from "@octokit/rest"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream/promises"
import { getProxyForUrl } from "proxy-from-env"
import { fetch, ProxyAgent } from "undici"
import type { RequestInit } from "undici"
import { extract } from "tar"
import tmp from "tmp-promise"
import admzip from "adm-zip"
import { COMBINED_PATH, NAME } from "./constants"

const octokit = new Octokit({ request: { fetch: proxiedFetch } })

export async function findRelease(version: string) {
  const release = await getRelease(version)
  const releasePrefix = getAssetPrefix()
  const matchedAsset = release.data.assets.find(({ name }) => {
    return (
      name.startsWith(releasePrefix) &&
      (name.endsWith(".tar.gz") || name.endsWith(".zip"))
    )
  })
  if (!matchedAsset) {
    throw new Error(`The binary '${releasePrefix}*' not found`)
  }
  return [
    release.data.name,
    matchedAsset.id,
    matchedAsset.name.endsWith(".zip") ? "zip" : "tar",
  ] as const
}

export async function downloadBinary(asset_id: number, asset_filetype: string) {
  // downloading the asset is copied from https://github.com/octokit/rest.js/issues/12#issuecomment-1916023479
  const asset = await octokit.repos.getReleaseAsset({
    owner: NAME,
    repo: NAME,
    asset_id: asset_id,
    headers: {
      accept: "application/octet-stream",
    },
    request: {
      parseSuccessResponseBody: false, // required to access response as stream
    },
  })
  const tmpfile = await tmp.file()

  const assetStream = asset.data as unknown as NodeJS.ReadableStream
  const outputFile = createWriteStream(tmpfile.path)
  await pipeline(assetStream, outputFile)

  if (asset_filetype === ".zip") {
    const zip = new admzip(tmpfile.path)
    zip.extractAllTo(COMBINED_PATH, true)
  } else {
    await extract({ file: tmpfile.path, cwd: COMBINED_PATH, strict: true })
  }

  await tmpfile.cleanup()
}

export async function proxiedFetch(url: string, opts: RequestInit = {}) {
  const proxy = getProxyForUrl(url)
  if (!proxy) {
    return fetch(url, { ...opts })
  }

  const proxyAgent = new ProxyAgent({
    uri: getProxyForUrl(url),
    keepAliveTimeout: 10,
    keepAliveMaxTimeout: 10,
  })

  return fetch(url, { ...opts, dispatcher: proxyAgent })
}

function getRelease(version: string) {
  const { getLatestRelease, getReleaseByTag } = octokit.rest.repos
  if (version === "latest") {
    return getLatestRelease({ owner: NAME, repo: NAME })
  }
  return getReleaseByTag({ owner: NAME, repo: NAME, tag: version })
}

function getAssetPrefix() {
  let platform: string = os.platform()
  if (platform === "win32") {
    platform = "windows"
  }
  let arch: string = os.arch()
  if (arch === "x32") {
    arch = "386"
  } else if (arch === "x64") {
    arch = "amd64"
  }
  return `ec-${platform}-${arch}`
}
