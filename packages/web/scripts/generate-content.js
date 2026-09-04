import { listings } from "../src/listing.js"
import { site } from "../src/catalog.js"

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url)
const rootReadme = new URL("../../../README.md", import.meta.url)

const codeBlock = (language, value) => `\`\`\`${language}\n${value}\n\`\`\``
const installCommand = (plugin) => `opencode2 plugin add '${plugin.target}'`

function renderLlms() {
  const pluginLinks = listings
    .map(
      (plugin) =>
        `- [${plugin.name}](${site.url}/${plugin.slug}.md): ${plugin.description} Requires ${plugin.requirements.join(" ")}`,
    )
    .join("\n")

  return `# ${site.name}

> ${site.description} Install these plugins from the public \`${site.repository}\` repository with \`opencode2 plugin add\`.

This is an install catalog, not a package registry. Use the markdown pages below instead of scraping the JavaScript page. Each Git install target uses a package branch built from its plugin directory in \`${site.repository}\`. Use the branch's full commit hash when you need an immutable install.

## Plugins

${pluginLinks}

## Site

- [Markdown catalog](${site.url}/index.md): Install commands and OpenCode configuration for every plugin.
- [HTML catalog](${site.url}/): Human-readable catalog with screenshots and copy buttons.

## Optional

- [Plugin source](https://github.com/${site.repository}/tree/${site.branch}/${site.pluginPath}): Source directories in \`${site.repository}\`.
- [OpenCode plugins guide](https://opencode.ai/v2/docs/build/plugins): OpenCode V2 plugin loading and packaging.
`
}

function renderIndex() {
  const sections = listings
    .map(
      (plugin) => `## ${plugin.name}

${plugin.description}

${plugin.requirements.map((item) => `- ${item}`).join("\n")}

${codeBlock("sh", installCommand(plugin))}

Or merge this into \`opencode.json\`:

${codeBlock("json", plugin.config)}

[Read the plugin notes](${site.url}/${plugin.slug}.md).`,
    )
    .join("\n\n")

  return `# ${site.name}

${site.description} The source lives in [${site.repository}](https://github.com/${site.repository}/tree/${site.branch}/${site.pluginPath}).

The install branches receive updates from the plugin directories in the dotfiles repository. Replace the branch name after \`#\` with its full commit hash if you need an immutable install.

${sections}
`
}

function renderPlugin(plugin) {
  return `# ${plugin.name}

> ${plugin.description}

[View the source](${plugin.source}).

## Requirements

${plugin.requirements.map((item) => `- ${item}`).join("\n")}

## Install

${codeBlock("sh", installCommand(plugin))}

This tracks the \`${plugin.ref}\` package branch. Replace the branch with its full commit hash for an immutable install. Do not add it again if OpenCode already loads the plugin from a local plugins directory.

Or merge this into \`opencode.json\`:

${codeBlock("json", plugin.config)}

## What it does

${plugin.capabilities.map((item) => `- ${item}`).join("\n")}

[Open the catalog entry](${site.url}/#${plugin.slug}).
`
}

function renderReadme() {
  const sections = listings
    .map(
      (plugin) => `### ${plugin.name}

${plugin.description}

${codeBlock("sh", installCommand(plugin))}

Requires ${plugin.requirements.join(" ")}`,
    )
    .join("\n\n")

  return `# OpenCode plugins

I keep the plugin code with the rest of my OpenCode config in [${site.repository}](https://github.com/${site.repository}/tree/${site.branch}/${site.pluginPath}). This repo stays boring. It builds the static catalog at [plugins.juguilon.com](${site.url}) and nothing else.

Install from the dotfiles package branches below, not from this repo.

## Plugins

${sections}

## Work on the catalog

${codeBlock("sh", `cd packages/web\nbun install --frozen-lockfile\nbun run dev`)}

Plugin facts live in \`packages/web/src/catalog.js\`. The build uses that file for the web page, README, and markdown docs, so install commands cannot drift between them.

Agents can start at [plugins.juguilon.com/llms.txt](${site.url}/llms.txt).
`
}

await Promise.all([
  Bun.write(publicFile("llms.txt"), renderLlms()),
  Bun.write(publicFile("index.md"), renderIndex()),
  ...listings.map((plugin) => Bun.write(publicFile(`${plugin.slug}.md`), renderPlugin(plugin))),
  Bun.write(rootReadme, renderReadme()),
])
