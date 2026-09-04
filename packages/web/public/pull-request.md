# Pull request

> Shows the current branch's GitHub pull request, reviews, and checks in the OpenCode sidebar.

[View the source](https://github.com/princejoogie/dotfiles/tree/main/agents/.config/opencode/plugins/pull-request).

## Requirements

- GitHub CLI (`gh`) authenticated for the repository.

## Install

```sh
opencode2 plugin add 'github:princejoogie/dotfiles#opencode-plugin-pull-request'
```

This tracks the `opencode-plugin-pull-request` package branch. Replace the branch with its full commit hash for an immutable install. Do not add it again if OpenCode already loads the plugin from a local plugins directory.

Or merge this into `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "github:princejoogie/dotfiles#opencode-plugin-pull-request"
  ]
}
```

## What it does

- Shows the pull request title, number, URL, branches, state, mergeability, and review decision.
- Shows additions, deletions, changed files, and GitHub checks.
- Refreshes after a successful `git push` or `gh pr create` in the same workspace.

[Open the catalog entry](https://plugins.juguilon.com/#pull-request).
