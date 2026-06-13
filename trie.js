export const createTrieNode = (char = '') => ({
  value: char,
  children: {},
  endOfWord: false,
  frequency: 0
});

export const addWord = (node, word) => {
  if (word.length === 0) {
    node.endOfWord = true;
    return;
  }
  const char = word[0];
  if (!node.children[char]) {
    node.children[char] = createTrieNode(char);
  }
  addWord(node.children[char], word.slice(1));
};
