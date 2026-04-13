#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

function readLines(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const wordsPath = path.join(repoRoot, 'data', 'words_small.txt');
  const conundrumsPath = path.join(repoRoot, 'data', 'conundrums_small.txt');

  const words = readLines(wordsPath);
  const conundrums = readLines(conundrumsPath);
  const errors = [];

  const normalizedWords = new Set();
  words.forEach((word, idx) => {
    const line = idx + 1;
    if (!/^[a-z]+$/.test(word)) {
      errors.push(`words_small.txt:${line} must contain lowercase a-z only: "${word}"`);
    }
    if (normalizedWords.has(word)) {
      errors.push(`words_small.txt:${line} duplicate entry: "${word}"`);
    }
    normalizedWords.add(word);
  });

  conundrums.forEach((word, idx) => {
    const line = idx + 1;
    if (!/^[a-z]+$/.test(word)) {
      errors.push(`conundrums_small.txt:${line} must contain lowercase a-z only: "${word}"`);
    }
    if (word.length !== 9) {
      errors.push(`conundrums_small.txt:${line} must be exactly 9 letters: "${word}"`);
    }
  });

  if (errors.length) {
    console.error('Data integrity check failed:');
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`Data integrity check passed (${words.length} words, ${conundrums.length} conundrums).`);
}

main();
