export const site = Object.freeze({
  name: "Juguilon OpenCode plugins",
  description: "OpenCode V2 plugins by Prince Carlo Juguilon.",
  url: "https://plugins.juguilon.com",
  repository: "princejoogie/dotfiles",
  branch: "main",
  pluginPath: "agents/.config/opencode/plugins",
})

export const plugins = Object.freeze([
  Object.freeze({
    slug: "pull-request",
    ref: "opencode-plugin-pull-request",
    name: "Pull request",
    description: "Shows the current branch's GitHub pull request, reviews, and checks in the OpenCode sidebar.",
    publishedAt: "2026-09-04",
    demo: "/pull-request.png",
    requirements: ["GitHub CLI (`gh`) authenticated for the repository."],
    capabilities: [
      "Shows the pull request title, number, URL, branches, state, mergeability, and review decision.",
      "Shows additions, deletions, changed files, and GitHub checks.",
      "Refreshes after a successful `git push` or `gh pr create` in the same workspace.",
    ],
    promptSuffix:
      "Explain that it adds a sidebar panel for the current branch's GitHub pull request, including status, reviews, and checks. Mention that it requires the GitHub CLI (`gh`).",
  }),
  Object.freeze({
    slug: "usage",
    ref: "opencode-plugin-usage",
    name: "Usage",
    description: "Shows OpenAI Codex and xAI Grok usage in the OpenCode sidebar.",
    publishedAt: "2026-09-04",
    demo: "/usage.png",
    requirements: [
      "Codex CLI for OpenAI Codex usage.",
      "OpenCode xAI login or Grok CLI credentials for xAI usage.",
    ],
    capabilities: [
      "Shows the plan name, used percentage, and time until reset.",
      "Compares usage pace with the time left in the window.",
      "Shows prepaid xAI credits when available.",
    ],
    promptSuffix:
      "Explain that it adds a sidebar panel for OpenAI Codex and xAI Grok usage. Mention that Codex needs the Codex CLI and xAI uses an OpenCode xAI login or Grok CLI credentials.",
  }),
])
