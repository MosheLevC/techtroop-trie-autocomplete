import { addWord, predictWords, useWord, countWords } from "./trie.js";
import * as View from "./view.js";

export const startApp = (root) => {
  const addInput = document.getElementById("add-input");
  const addButton = document.getElementById("add-button");
  const autoInput = document.getElementById("autocomplete-input");

  const updateUI = () => {
    View.updateWordCount(countWords(root));
  };

  addButton.onclick = () => {
    const word = addInput.value.trim();
    if (!word) return View.displayError("Cannot add empty word");
    
    addWord(root, word);
    View.displaySuccess(`Added '${word}' to dictionary`);
    View.clearInput("add-input");
    updateUI();
  };

  autoInput.oninput = (e) => {
    const prefix = e.target.value.trim();
    const suggestions = predictWords(root, prefix);
    View.displaySuggestions(prefix, suggestions);
  };

  document.addEventListener("suggestionSelected", (e) => {
    const word = e.detail;
    useWord(root, word);
    View.setInputValue("autocomplete-input", word);
    View.displaySuggestions("", []);
    updateUI();
  });

  updateUI();
};
