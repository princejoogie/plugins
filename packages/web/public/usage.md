# Usage

> Shows OpenAI Codex and xAI Grok usage in the OpenCode sidebar.

[View the source](https://github.com/princejoogie/dotfiles/tree/main/agents/.config/opencode/plugins/usage).

## Requirements

- Codex CLI for OpenAI Codex usage.
- OpenCode xAI login or Grok CLI credentials for xAI usage.

## Install

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-usage'
```

This tracks the `opencode-plugin-usage` package branch. Replace the branch with its full commit hash for an immutable install. Do not add it again if OpenCode already loads the plugin from a local plugins directory.

Or merge this into `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "github:princejoogie/dotfiles#opencode-plugin-usage"
  ]
}
```

## What it does

- Shows the plan name, used percentage, and time until reset.
- Compares usage pace with the time left in the window.
- Shows prepaid xAI credits when available.

[Open the catalog entry](https://plugins.juguilon.com/#usage).
