import { createTrieNode } from "./trie.js";
import { startApp } from "./controller.js";

const root = createTrieNode();

document.addEventListener("DOMContentLoaded", () => {
  startApp(root);
});
