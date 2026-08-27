/*!
 * These tests are mostly based on the code below to closely simulate a proxy environment.
 *
 * https://github.com/octokit/core.js/blob/e011c556521ebdecb72b33edab96264c8e0174f6/test/agent-proxy/agent-proxy-test.test.ts
 * Released under the MIT License
 * Copyright (c) 2019 Octokit contributors
 *
 * See link above for additional attribution.
 */

import { type AddressInfo } from "node:net"
import { Server, createServer } from "node:http"
import { describe, it, beforeEach, afterEach } from "node:test"
import assert from "node:assert/strict"

import { ProxyServer, createProxy } from "proxy"
import {
  findFirstMatchingAsset,
  getAssetPrefixes,
  proxiedFetch,
} from "./release"

const oldEnv = process.env

describe("proxiedFetch", () => {
  let server: Server
  let proxyServer: ProxyServer
  let serverUrl: string
  let proxyUrl: string
  let proxyConnectionEstablished: boolean

  beforeEach(() => {
    proxyConnectionEstablished = false
    server = createServer()
    server.listen(0, () => {})

    proxyServer = createProxy()
    proxyServer.listen(0, () => {})

    serverUrl = `http://localhost:${(server.address() as AddressInfo).port}`
    proxyUrl = `http://localhost:${(proxyServer.address() as AddressInfo).port}`

    proxyServer.on("connect", () => {
      proxyConnectionEstablished = true
    })

    server.on("request", (request, response) => {
      response.writeHead(200)
      response.write("ok")
      response.end()
    })
  })

  afterEach(() => {
    server.close()
    proxyServer.close()
    process.env = oldEnv
  })

  it("should use ProxyAgent when http_proxy present", async () => {
    process.env.http_proxy = proxyUrl

    await proxiedFetch(serverUrl)
    assert.equal(proxyConnectionEstablished, true)
  })

  it("should not use ProxyAgent without proxy environment", async () => {
    delete process.env.http_proxy
    delete process.env.HTTP_PROXY

    await proxiedFetch(serverUrl)
    assert.equal(proxyConnectionEstablished, false)
  })

  it("should not use ProxyAgent with http_proxy and matching no_proxy", async () => {
    process.env.http_proxy = proxyUrl
    process.env.no_proxy = "localhost"

    await proxiedFetch(serverUrl)
    assert.equal(proxyConnectionEstablished, false)
  })

  it("should use ProxyAgent with http_proxy and mismatching no_proxy", async () => {
    process.env.http_proxy = proxyUrl
    process.env.no_proxy = "example.com"

    await proxiedFetch(serverUrl)
    assert.equal(proxyConnectionEstablished, true)
  })
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
