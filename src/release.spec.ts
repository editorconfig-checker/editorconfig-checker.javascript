import { fork, type ChildProcess } from "node:child_process"
import http, { type Server } from "node:http"
import type { AddressInfo } from "node:net"
import { describe, it, before, after, afterEach } from "node:test"
import assert from "node:assert/strict"

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
