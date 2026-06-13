import test from 'node:test';
import assert from 'node:assert';
import { formatSuggestions } from './view.js';

test('formatSuggestions with results', () => {
  const suggestions = [
    { word: 'cat', frequency: 2 },
    { word: 'car', frequency: 0 }
  ];
  const result = formatSuggestions('ca', suggestions);
  assert.strictEqual(result, 'Suggestions for "ca": cat (2), car (0)');
});

test('formatSuggestions with no results', () => {
  const result = formatSuggestions('ca', []);
  assert.strictEqual(result, 'No suggestions found for "ca"');
});
