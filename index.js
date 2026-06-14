import { createTrieNode } from './trie.js';
import { displayWelcome } from './view.js';
import { startApp } from './controller.js';

const root = createTrieNode();

displayWelcome();
startApp(root);
