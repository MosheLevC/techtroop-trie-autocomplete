import readline from "node:readline";
import { addWord, findWord, predictWords, useWord } from "./trie.js";
import { displayHelp, displaySuccess, displayError, displaySuggestions } from "./view.js";

export const handleCommand = (root, input, rl) => {
  const [command, ...args] = input.trim().split(/\s+/);
  const arg = args.join(" ");

  switch (command.toLowerCase()) {
    case "add":
      if (!arg) return displayError("Please provide a word to add");
      addWord(root, arg);
      displaySuccess(`Added word: "${arg}"`);
      break;
    case "find":
      if (!arg) return displayError("Please provide a word to find");
      findWord(root, arg) ? displaySuccess(`Word "${arg}" exists`) : displayError(`Word "${arg}" not found`);
      break;
    case "complete":
      if (!arg) return displayError("Please provide a prefix");
      const suggestions = predictWords(root, arg);
      displaySuggestions(arg, suggestions);
      break;
    case "use":
      if (!arg) return displayError("Please provide a word to use");
      useWord(root, arg);
      displaySuccess(`Incremented frequency for: "${arg}"`);
      break;
    case "help":
      displayHelp();
      break;
    case "exit":
      rl.close();
      return;
    default:
      displayError('Unknown command. Type "help" for a list of commands.');
  }
};

export const startApp = (root) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    handleCommand(root, line, rl);
    if (!rl.closed) rl.prompt();
  }).on("close", () => {
    console.log("\nGoodbye!");
    process.exit(0);
  });
};
