import test from 'node:test';
import assert from 'node:assert';
import { createTrieNode } from './trie.js';

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
