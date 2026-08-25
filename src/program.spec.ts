import fs from "node:fs/promises"
import path from "node:path"
import { describe, it, beforeEach, afterEach } from "node:test"
import assert from "node:assert/strict"

import tmp from "tmp-promise"
import { findProgram } from "./program"

describe("findProgram", () => {
  let directory: tmp.DirectoryResult

  beforeEach(async () => {
    directory = await tmp.dir({ unsafeCleanup: true })
  })

  afterEach(async () => {
    await directory.cleanup()
  })

  it("should find the binary at the archive root", async () => {
    // Arrange - Given
    const input = { directory: directory.path, platform: "linux" }
    const program = path.join(input.directory, "editorconfig-checker")
    await fs.writeFile(program, "")

    // Act - When
    const output = await findProgram(input.directory, input.platform)

    // Assert - Then
    const expected = program
    assert.equal(output, expected)
  })

  it("should find the .exe binary at the archive root on windows", async () => {
    // Arrange - Given
    const input = { directory: directory.path, platform: "win32" }
    const program = path.join(input.directory, "editorconfig-checker.exe")
    await fs.writeFile(program, "")

    // Act - When
    const output = await findProgram(input.directory, input.platform)

    // Assert - Then
    const expected = program
    assert.equal(output, expected)
  })

  it("should fall back to the legacy bin/ directory", async () => {
    // Arrange - Given
    const input = { directory: directory.path, platform: "linux" }
    const binPath = path.join(input.directory, "bin")
    await fs.mkdir(binPath)
    const program = path.join(binPath, "ec-linux-amd64")
    await fs.writeFile(program, "")

    // Act - When
    const output = await findProgram(input.directory, input.platform)

    // Assert - Then
    const expected = program
    assert.equal(output, expected)
  })
})
