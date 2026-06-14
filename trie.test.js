import test from "node:test";
import assert from "node:assert";
import { createTrieNode, addWord, findWord, getRemainingTree, predictWords, useWord } from "./trie.js";

test("createTrieNode default values", () => {
  const node = createTrieNode();
  assert.strictEqual(node.value, "");
  assert.strictEqual(node.endOfWord, false);
  assert.strictEqual(node.frequency, 0);
  assert.deepStrictEqual(node.children, {});
});

test("createTrieNode with character", () => {
  const node = createTrieNode("a");
  assert.strictEqual(node.value, "a");
});

test("createTrieNode returns a new object every time", () => {
  const node1 = createTrieNode("a");
  const node2 = createTrieNode("a");
  assert.notStrictEqual(node1, node2);
});

test("addWord adds a single word", () => {
  const root = createTrieNode();
  addWord(root, "a");
  assert.strictEqual(root.children["a"].value, "a");
  assert.strictEqual(root.children["a"].endOfWord, true);
});

test("addWord handles empty string", () => {
  const root = createTrieNode();
  addWord(root, "");
  assert.strictEqual(root.endOfWord, true);
});

test("addWord handles overlapping prefixes", () => {
  const root = createTrieNode();
  addWord(root, "cat");
  addWord(root, "can");
  assert.strictEqual(root.children["c"].children["a"].children["t"].endOfWord, true);
  assert.strictEqual(root.children["c"].children["a"].children["n"].endOfWord, true);
});

test("findWord finds existing words", () => {
  const root = createTrieNode();
  addWord(root, "hello");
  assert.strictEqual(findWord(root, "hello"), true);
});

test("findWord returns false for non-existing words", () => {
  const root = createTrieNode();
  addWord(root, "hello");
  assert.strictEqual(findWord(root, "world"), false);
});

test("findWord returns false for prefixes that are not words", () => {
  const root = createTrieNode();
  addWord(root, "hello");
  assert.strictEqual(findWord(root, "hell"), false);
});

test("getRemainingTree returns the correct node for a prefix", () => {
  const root = createTrieNode();
  addWord(root, "cat");
  const node = getRemainingTree(root, "ca");
  assert.strictEqual(node.value, "a");
});

test("predictWords returns completions sorted by frequency", () => {
  const root = createTrieNode();
  addWord(root, "car");
  addWord(root, "cat");
  addWord(root, "can");
  useWord(root, "cat");
  useWord(root, "cat");
  useWord(root, "can");
  const predictions = predictWords(root, "ca");
  assert.strictEqual(predictions[0].word, "cat");
  assert.strictEqual(predictions[1].word, "can");
  assert.strictEqual(predictions[2].word, "car");
});

test("useWord increments frequency of an existing word", () => {
  const root = createTrieNode();
  addWord(root, "cat");
  useWord(root, "cat");
  const node = getRemainingTree(root, "cat");
  assert.strictEqual(node.frequency, 1);
});
