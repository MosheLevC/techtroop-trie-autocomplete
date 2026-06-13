export const createTrieNode = (char = '') => ({
  value: char,
  children: {},
  endOfWord: false,
  frequency: 0
});
