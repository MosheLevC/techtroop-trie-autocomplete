export const displayWelcome = () => {
  console.log('==============================');
  console.log('   Trie AutoComplete CLI');
  console.log('==============================');
  console.log('Type "help" to see commands.');
};

export const displayHelp = () => {
  console.log('\nAvailable Commands:');
  console.log('  add <word>       - Add a word to the trie');
  console.log('  find <word>      - Check if a word exists');
  console.log('  complete <prefix>- Get suggestions for a prefix');
  console.log('  use <word>       - Increment usage of a word');
  console.log('  help             - Show this help message');
  console.log('  exit             - Close the application\n');
};

export const displaySuccess = (message) => {
  console.log(`✓ ${message}`);
};

export const displayError = (message) => {
  console.log(`✗ Error: ${message}`);
};

export const formatSuggestions = (prefix, suggestions) => {
  if (suggestions.length === 0) {
    return `No suggestions found for "${prefix}"`;
  }
  const formatted = suggestions
    .map((s) => `${s.word} (${s.frequency})`)
    .join(', ');
  return `Suggestions for "${prefix}": ${formatted}`;
};

export const displaySuggestions = (prefix, suggestions) => {
  console.log(formatSuggestions(prefix, suggestions));
};
