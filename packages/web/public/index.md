# Juguilon OpenCode plugins

OpenCode V2 plugins by Prince Carlo Juguilon. The source lives in [princejoogie/dotfiles](https://github.com/princejoogie/dotfiles/tree/main/agents/.config/opencode/plugins).

The install branches receive updates from the plugin directories in the dotfiles repository. Replace the branch name after `#` with its full commit hash if you need an immutable install.

## Pull request

Shows the current branch's GitHub pull request, reviews, and checks in the OpenCode sidebar.

- GitHub CLI (`gh`) authenticated for the repository.

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-pull-request'
```

Or merge this into `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "github:princejoogie/dotfiles#opencode-plugin-pull-request"
  ]
}
```

[Read the plugin notes](https://plugins.juguilon.com/pull-request.md).

## Usage

Shows OpenAI Codex and xAI Grok usage in the OpenCode sidebar.

- Codex CLI for OpenAI Codex usage.
- OpenCode xAI login or Grok CLI credentials for xAI usage.

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-usage'
```

Or merge this into `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "github:princejoogie/dotfiles#opencode-plugin-usage"
  ]
}
```

[Read the plugin notes](https://plugins.juguilon.com/usage.md).
