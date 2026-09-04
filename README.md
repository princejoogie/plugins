# OpenCode plugins

I keep the plugin code with the rest of my OpenCode config in [princejoogie/dotfiles](https://github.com/princejoogie/dotfiles/tree/main/agents/.config/opencode/plugins). This repo stays boring. It builds the static catalog at [plugins.juguilon.com](https://plugins.juguilon.com) and nothing else.

Install from the dotfiles package branches below, not from this repo.

## Plugins

### Pull request

Shows the current branch's GitHub pull request, reviews, and checks in the OpenCode sidebar.

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-pull-request'
```

Requires GitHub CLI (`gh`) authenticated for the repository.

### Usage

Shows OpenAI Codex and xAI Grok usage in the OpenCode sidebar.

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-usage'
```

Requires Codex CLI for OpenAI Codex usage. OpenCode xAI login or Grok CLI credentials for xAI usage.

## Work on the catalog

```sh
cd packages/web
bun install --frozen-lockfile
bun run dev
```

Plugin facts live in `packages/web/src/catalog.js`. The build uses that file for the web page, README, and markdown docs, so install commands cannot drift between them.

Agents can start at [plugins.juguilon.com/llms.txt](https://plugins.juguilon.com/llms.txt).
