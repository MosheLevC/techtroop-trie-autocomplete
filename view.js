export const displaySuccess = (message) => {
  const el = document.getElementById("message");
  if (el) {
    el.textContent = `✓ ${message}`;
    el.className = "message msg-success";
    setTimeout(() => { 
      el.className = "message"; 
      el.textContent = "";
    }, 3000);
  }
};

export const displayError = (message) => {
  const el = document.getElementById("message");
  if (el) {
    el.textContent = `✗ ${message}`;
    el.className = "message msg-error";
    setTimeout(() => { 
      el.className = "message";
      el.textContent = "";
    }, 3000);
  }
};

export const formatSuggestions = (prefix, suggestions) => {
  if (suggestions.length === 0) {
    return `No suggestions found for "${prefix}"`;
  }
  return `Suggestions for "${prefix}": ` + suggestions.map((s) => `${s.word} (${s.frequency})`).join(", ");
};

export const displaySuggestions = (prefix, suggestions) => {
  const list = document.getElementById("suggestions-list");
  if (!list) return;

  list.innerHTML = "";
  
  if (!prefix) {
    list.classList.remove("visible");
    return;
  }

  list.classList.add("visible");

  if (suggestions.length === 0) {
    const li = document.createElement("li");
    li.className = "no-suggestions";
    li.textContent = formatSuggestions(prefix, []);
    list.appendChild(li);
    return;
  }

  suggestions.forEach((s) => {
    const li = document.createElement("li");
    li.className = "suggestion-item";
    li.textContent = `${s.word} (${s.frequency})`;
    li.onclick = () => {
      const event = new CustomEvent("suggestionSelected", { detail: s.word });
      document.dispatchEvent(event);
    };
    list.appendChild(li);
  });
};

export const updateWordCount = (count) => {
  const el = document.getElementById("word-count");
  if (el) el.textContent = count;
};

export const clearInput = (id) => {
  const el = document.getElementById(id);
  if (el) el.value = "";
};

export const setInputValue = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.value = value;
};
