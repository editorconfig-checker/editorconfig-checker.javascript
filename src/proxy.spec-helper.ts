import type { AddressInfo } from "node:net"
import { createProxy } from "proxy"

const proxyServer = createProxy()
let hits = 0
proxyServer.on("request", () => hits++)
proxyServer.on("connect", () => hits++)

process.on("message", (message) => {
  if (message === "hits") {
    process.send?.({ hits })
  }
})

proxyServer.listen(0, () => {
  process.send?.({ port: (proxyServer.address() as AddressInfo).port })
})
