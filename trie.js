export const createTrieNode = (char = "") => ({
  value: char,
  children: {},
  endOfWord: false,
  frequency: 0,
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

export const findWord = (node, word) => {
  if (word.length === 0) {
    return node.endOfWord;
  }
  const char = word[0];
  if (!node.children[char]) {
    return false;
  }
  return findWord(node.children[char], word.slice(1));
};

export const getRemainingTree = (node, prefix) => {
  if (prefix.length === 0) {
    return node;
  }
  const char = prefix[0];
  if (!node.children[char]) {
    return null;
  }
  return getRemainingTree(node.children[char], prefix.slice(1));
};

export const allWordsHelper = (node, currentWord, results) => {
  if (node.endOfWord) {
    results.push({ word: currentWord, frequency: node.frequency });
  }
  for (const char in node.children) {
    allWordsHelper(node.children[char], currentWord + char, results);
  }
};

export const predictWords = (root, prefix) => {
  const remainingTree = getRemainingTree(root, prefix);
  if (!remainingTree) {
    return [];
  }
  const results = [];
  allWordsHelper(remainingTree, prefix, results);
  return results.sort((a, b) => b.frequency - a.frequency);
};

export const useWord = (node, word) => {
  if (word.length === 0) {
    if (node.endOfWord) {
      node.frequency += 1;
    }
    return;
  }
  const char = word[0];
  if (node.children[char]) {
    useWord(node.children[char], word.slice(1));
  }
};
