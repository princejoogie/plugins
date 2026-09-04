import { plugins, site } from "./catalog.js"

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const demoPattern = /^\/[A-Za-z0-9._-]+$/

export function targetFor(plugin) {
  return `github:${site.repository}#${plugin.ref}`
}

export function sourceFor(plugin) {
  return `https://github.com/${site.repository}/tree/${site.branch}/${site.pluginPath}/${plugin.slug}`
}

export function configFor(plugin) {
  return JSON.stringify(
    {
      $schema: "https://opencode.ai/config.json",
      plugins: [targetFor(plugin)],
    },
    null,
    2,
  )
}

export function promptFor(plugin) {
  return `Install the ${plugin.name.toLowerCase()} plugin globally in OpenCode V2 by running: opencode2 plugin add '${targetFor(plugin)}'. Preserve my existing configuration and avoid loading a duplicate if this plugin is already installed locally. ${plugin.promptSuffix}`
}

export function listingFor(plugin) {
  if (!slugPattern.test(plugin.slug)) throw new Error(`Invalid plugin slug: ${plugin.slug}`)
  if (!slugPattern.test(plugin.ref)) throw new Error(`Invalid plugin ref: ${plugin.ref}`)
  if (!demoPattern.test(plugin.demo)) throw new Error(`Invalid plugin demo path: ${plugin.demo}`)
  return Object.freeze({
    ...plugin,
    target: targetFor(plugin),
    source: sourceFor(plugin),
    config: configFor(plugin),
    prompt: promptFor(plugin),
  })
}

export const listings = Object.freeze(
  plugins
    .map(listingFor)
    .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.name.localeCompare(b.name)),
)
