import { fork, type ChildProcess } from "node:child_process"
import http, { type Server } from "node:http"
import type { AddressInfo } from "node:net"
import { describe, it, before, after, afterEach } from "node:test"
import assert from "node:assert/strict"

import { findFirstMatchingAsset, getAssetPrefixes } from "./release"

describe("setGlobalProxyFromEnv with fetch", () => {
  let server: Server
  let proxy: ChildProcess
  let serverUrl: string
  let proxyUrl: string
  let restoreGlobalProxy = () => {}

  before(async () => {
    server = http.createServer((_request, response) => response.end("ok"))
    await new Promise<void>((resolve) => server.listen(0, resolve))
    serverUrl = `http://localhost:${(server.address() as AddressInfo).port}`

    proxy = fork("src/proxy.spec-helper.ts", { execArgv: ["--import=tsx"] })
    const { port } = await nextMessage<{ port: number }>()
    proxyUrl = `http://localhost:${port}`
  })

  afterEach(() => {
    restoreGlobalProxy()
  })

  after(() => {
    server.close()
    proxy.kill()
  })

  it("uses the proxy when http_proxy is set", async () => {
    assert.equal(await proxyHitsFor({ http_proxy: proxyUrl }), 1)
  })

  it("does not use the proxy without proxy environment", async () => {
    assert.equal(await proxyHitsFor({}), 0)
  })

  it("does not use the proxy with a matching no_proxy", async () => {
    const env = { http_proxy: proxyUrl, no_proxy: "localhost" }
    assert.equal(await proxyHitsFor(env), 0)
  })

  it("uses the proxy with a mismatching no_proxy", async () => {
    const env = { http_proxy: proxyUrl, no_proxy: "example.com" }
    assert.equal(await proxyHitsFor(env), 1)
  })

  async function proxyHitsFor(env: Record<string, string>) {
    const hitsBefore = await proxyHits()
    restoreGlobalProxy = http.setGlobalProxyFromEnv(env)
    await (await fetch(serverUrl)).text()
    return (await proxyHits()) - hitsBefore
  }

  async function proxyHits() {
    proxy.send("hits")
    const { hits } = await nextMessage<{ hits: number }>()
    return hits
  }

  function nextMessage<T>() {
    return new Promise<T>((resolve) => proxy.once("message", resolve))
  }
})

describe("getAssetPrefixes", () => {
  it("should prefer the current asset name and fall back to the legacy one", () => {
    // Arrange - Given
    const input = { platform: "linux", arch: "x64" }

    // Act - When
    const output = getAssetPrefixes(input.platform, input.arch)

    // Assert - Then
    const expected = ["editorconfig-checker-linux-amd64", "ec-linux-amd64"]
    assert.deepEqual(output, expected)
  })

  it("should map win32 and x32 to the release naming", () => {
    // Arrange - Given
    const input = { platform: "win32", arch: "x32" }

    // Act - When
    const output = getAssetPrefixes(input.platform, input.arch)

    // Assert - Then
    const expected = ["editorconfig-checker-windows-386", "ec-windows-386"]
    assert.deepEqual(output, expected)
  })

  it("should accept the universal darwin binary", () => {
    // Arrange - Given
    const input = { platform: "darwin", arch: "arm64" }

    // Act - When
    const output = getAssetPrefixes(input.platform, input.arch)

    // Assert - Then
    const expected = [
      "editorconfig-checker-darwin-arm64",
      "editorconfig-checker-darwin-all",
      "ec-darwin-arm64",
    ]
    assert.deepEqual(output, expected)
  })
})

describe("findFirstMatchingAsset", () => {
  const legacyAssets = [
    { name: "checksums.txt" },
    { name: "ec-linux-amd64.tar.gz" },
    { name: "ec-linux-amd64.tar.gz.sbom.json" },
  ]
  const currentAssets = [
    { name: "editorconfig-checker-darwin-all.tar.gz" },
    { name: "editorconfig-checker-linux-amd64.tar.gz" },
    { name: "editorconfig-checker-windows-amd64.tar.gz" },
    { name: "editorconfig-checker-windows-amd64.zip" },
  ]

  it("should pick the current asset when both are published", () => {
    // Arrange - Given
    const input = {
      assets: [...legacyAssets, ...currentAssets],
      assetPrefixes: getAssetPrefixes("linux", "x64"),
    }

    // Act - When
    const output = findFirstMatchingAsset(input.assets, input.assetPrefixes)

    // Assert - Then
    const expected = { name: "editorconfig-checker-linux-amd64.tar.gz" }
    assert.deepEqual(output, expected)
  })

  it("should pick the legacy asset for releases before the rename", () => {
    // Arrange - Given
    const input = {
      assets: legacyAssets,
      assetPrefixes: getAssetPrefixes("linux", "x64"),
    }

    // Act - When
    const output = findFirstMatchingAsset(input.assets, input.assetPrefixes)

    // Assert - Then
    const expected = { name: "ec-linux-amd64.tar.gz" }
    assert.deepEqual(output, expected)
  })

  it("should pick the universal binary on darwin", () => {
    // Arrange - Given
    const input = {
      assets: currentAssets,
      assetPrefixes: getAssetPrefixes("darwin", "arm64"),
    }

    // Act - When
    const output = findFirstMatchingAsset(input.assets, input.assetPrefixes)

    // Assert - Then
    const expected = { name: "editorconfig-checker-darwin-all.tar.gz" }
    assert.deepEqual(output, expected)
  })

  it("should ignore sbom and checksum files", () => {
    // Arrange - Given
    const input = {
      assets: [
        { name: "checksums.txt" },
        { name: "ec-linux-amd64.tar.gz.sbom.json" },
      ],
      assetPrefixes: getAssetPrefixes("linux", "x64"),
    }

    // Act - When
    const output = findFirstMatchingAsset(input.assets, input.assetPrefixes)

    // Assert - Then
    const expected = undefined
    assert.equal(output, expected)
  })
})
