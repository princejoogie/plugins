import { describe, expect, test } from "bun:test"
import { configFor, listingFor, listings, targetFor } from "./listing.js"

describe("plugin listing", () => {
  test("builds dotfiles install targets", () => {
    expect(targetFor(listings[0])).toStartWith("github:princejoogie/dotfiles#opencode-plugin-")
    expect(listings.map((plugin) => plugin.slug).toSorted()).toEqual(["pull-request", "usage"])
  })

  test("builds valid OpenCode config", () => {
    for (const plugin of listings) {
      expect(JSON.parse(configFor(plugin))).toEqual({
        $schema: "https://opencode.ai/config.json",
        plugins: [plugin.target],
      })
    }
  })

  test("rejects remote demo URLs", () => {
    expect(() =>
      listingFor({
        ...listings[0],
        demo: "https://tracker.example/demo.png",
      }),
    ).toThrow("Invalid plugin demo path")
  })
})
