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
import { proxiedFetch } from "./release"

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
