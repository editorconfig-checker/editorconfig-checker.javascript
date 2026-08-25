import os from "node:os"

import { Octokit } from "@octokit/rest"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream/promises"
import http from "node:http"
import https from "node:https"
import type { IncomingMessage } from "node:http"
import { Readable } from "node:stream"
import { extract } from "tar"
import tmp from "tmp-promise"
import admzip from "adm-zip"
import { COMBINED_PATH, NAME } from "./constants"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: { fetch: proxiedFetch },
})

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

export async function downloadBinary(assetId: number, assetFiletype: string) {
  // downloading the asset is copied from https://github.com/octokit/rest.js/issues/12#issuecomment-1916023479
  const asset = await octokit.repos.getReleaseAsset({
    owner: NAME,
    repo: NAME,
    asset_id: assetId,
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

  if (assetFiletype === ".zip") {
    const zip = new admzip(tmpfile.path)
    zip.extractAllTo(COMBINED_PATH, true)
  } else {
    await extract({ file: tmpfile.path, cwd: COMBINED_PATH, strict: true })
  }

  await tmpfile.cleanup()
}

export async function proxiedFetch(url: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  let target = new URL(url)
  let response = await request(target, init.method, headers)
  for (
    let redirects = 0;
    redirects < 5 && response.headers.location;
    redirects++
  ) {
    response.resume()
    const next = new URL(response.headers.location, target)
    if (next.origin !== target.origin) {
      headers.delete("authorization")
    }
    target = next
    response = await request(target, init.method, headers)
  }
  const hasBody = response.statusCode !== 204 && response.statusCode !== 304
  return new Response(
    hasBody ? (Readable.toWeb(response) as ReadableStream) : null,
    {
      status: response.statusCode,
      headers: response.headers as Record<string, string>,
    },
  )
}

function request(target: URL, method = "GET", headers: Headers) {
  const client = target.protocol === "https:" ? https : http
  const agent = new client.Agent({ proxyEnv: process.env })
  const options = { method, headers: Object.fromEntries(headers), agent }
  return new Promise<IncomingMessage>((resolve, reject) => {
    client.request(target, options, resolve).once("error", reject).end()
  })
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
