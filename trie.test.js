import test from 'node:test';
import assert from 'node:assert';
import { createTrieNode, addWord } from './trie.js';

test('createTrieNode default values', () => {
  const node = createTrieNode();
  assert.strictEqual(node.value, '');
  assert.strictEqual(node.endOfWord, false);
  assert.strictEqual(node.frequency, 0);
  assert.deepStrictEqual(node.children, {});
});

test('createTrieNode with character', () => {
  const node = createTrieNode('a');
  assert.strictEqual(node.value, 'a');
});

test('createTrieNode returns a new object every time', () => {
  const node1 = createTrieNode('a');
  const node2 = createTrieNode('a');
  assert.notStrictEqual(node1, node2);
});

test('addWord adds a single word', () => {
  const root = createTrieNode();
  addWord(root, 'a');
  assert.strictEqual(root.children['a'].value, 'a');
  assert.strictEqual(root.children['a'].endOfWord, true);
});

test('addWord handles empty string', () => {
  const root = createTrieNode();
  addWord(root, '');
  assert.strictEqual(root.endOfWord, true);
});

test('addWord handles overlapping prefixes', () => {
  const root = createTrieNode();
  addWord(root, 'cat');
  addWord(root, 'can');
  assert.strictEqual(root.children['c'].children['a'].children['t'].endOfWord, true);
  assert.strictEqual(root.children['c'].children['a'].children['n'].endOfWord, true);
});
