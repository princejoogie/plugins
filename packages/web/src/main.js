import "./style.css"
import { listings } from "./listing.js"

const list = document.querySelector("#plugins")
const directory = document.querySelector("#directory")
for (const { slug, name } of [...listings].toSorted((a, b) => a.name.localeCompare(b.name))) {
  const item = document.createElement("li")
  const link = document.createElement("a")
  link.href = `#${slug}`
  link.textContent = name
  item.append(link)
  directory.append(item)
}

for (const plugin of listings) {
  const { slug, name, config, prompt, source, demo, description } = plugin
  const item = document.querySelector("#plugin-template").content.firstElementChild.cloneNode(true)

  const article = item.querySelector("article")
  const link = item.querySelector("a")
  article.id = slug
  article.tabIndex = -1
  link.textContent = name
  link.href = source
  item.querySelector(".description").textContent = description
  const image = item.querySelector(".plugin-demo")
  image.src = demo
  image.alt = `${name} in the OpenCode sidebar.`
  highlightJson(item.querySelector(".config pre code"), config)
  item.querySelector(".config pre").setAttribute("aria-label", `${name} OpenCode configuration`)

  const status = item.querySelector(".status")
  const fallback = item.querySelector(".copy-fallback")
  let reset

  for (const [selector, value, label, done] of [
    ['[data-copy="config"]', config, "Copy config", "Merge into opencode.json."],
    ['[data-copy="prompt"]', prompt, "Copy prompt", "Paste into OpenCode."],
  ]) {
    const button = item.querySelector(selector)
    button.addEventListener("click", async () => {
      clearTimeout(reset)
      for (const other of item.querySelectorAll("[data-copy]")) {
        other.textContent = other.dataset.copy === "config" ? "Copy config" : "Copy prompt"
        delete other.dataset.copied
      }
      fallback.hidden = true
      status.textContent = ""
      try {
        await navigator.clipboard.writeText(value)
        button.textContent = "Copied"
        button.dataset.copied = "true"
        status.textContent = done
        reset = setTimeout(() => {
          button.textContent = label
          delete button.dataset.copied
          status.textContent = ""
        }, 3000)
      } catch {
        fallback.hidden = false
        fallback.value = value
        fallback.focus()
        fallback.select()
        button.textContent = label
        delete button.dataset.copied
        status.textContent = "Copy unavailable. Text selected; copy it manually."
      }
    })
  }

  list.append(item)
}

function highlightJson(node, source) {
  let cursor = 0
  for (const match of source.matchAll(/"(?:\\.|[^"\\])*"|[{}\[\],:]/g)) {
    node.append(document.createTextNode(source.slice(cursor, match.index)))
    const token = document.createElement("span")
    token.className = match[0].startsWith('"')
      ? /^\s*:/.test(source.slice(match.index + match[0].length))
        ? "syntax-key"
        : "syntax-string"
      : "syntax-punctuation"
    token.textContent = match[0]
    node.append(token)
    cursor = match.index + match[0].length
  }
  node.append(document.createTextNode(source.slice(cursor)))
}
