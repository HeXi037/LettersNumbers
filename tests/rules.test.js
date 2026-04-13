const test = require('node:test');
const assert = require('node:assert/strict');
const {
  VOWELS,
  CONSONANTS,
  generateLettersFromSequence,
  scoreLettersSubmissions,
  applyConundrumAnswer,
  tokenize,
  validateNumberUsage,
  toRpn,
  evalRpn
} = require('../gameLogic.js');

test('letters draw supports arbitrary vowel/consonant sequences including 9/0 splits', () => {
  const allVowels = Array(9).fill('vowel');
  const allConsonants = Array(9).fill('consonant');
  const mixed = ['vowel', 'consonant', 'vowel', 'consonant', 'consonant', 'vowel', 'consonant', 'vowel', 'consonant'];

  const vowelsDrawn = generateLettersFromSequence(allVowels, {}, {}, () => 0);
  const consonantsDrawn = generateLettersFromSequence(allConsonants, {}, {}, () => 0);
  const mixedDrawn = generateLettersFromSequence(mixed, {}, {}, () => 0);

  assert.equal(vowelsDrawn.length, 9);
  assert.equal(consonantsDrawn.length, 9);
  assert.equal(mixedDrawn.length, 9);
  assert.ok(vowelsDrawn.every((letter) => VOWELS.includes(letter)));
  assert.ok(consonantsDrawn.every((letter) => CONSONANTS.includes(letter)));
  assert.ok(VOWELS.includes(mixedDrawn[0]) && CONSONANTS.includes(mixedDrawn[1]));
});

test('conundrum awards first correct team only', () => {
  const round = { solution: 'triangle', solved: false, winnerTeam: null };

  const first = applyConundrumAnswer(round, 'A', 'triangle');
  const second = applyConundrumAnswer(round, 'B', 'triangle');

  assert.equal(first.correct, true);
  assert.equal(round.solved, true);
  assert.equal(round.winnerTeam, 'A');
  assert.equal(second.accepted, false);
  assert.equal(second.alreadySolved, true);
});

test('letters scoring rule awards each valid word independently', () => {
  const awards = scoreLettersSubmissions({
    A: { valid: true, score: 7 },
    B: { valid: true, score: 9 }
  });

  assert.deepEqual(awards, { A: 7, B: 9 });
});

test('numbers parser enforces reuse limits and integer-only division', () => {
  const expr = '(50/10)+7';
  const tokens = tokenize(expr);
  const numbers = tokens.filter((token) => token.type === 'number').map((token) => token.value);
  assert.deepEqual(validateNumberUsage(numbers, [50, 10, 7, 3, 2, 1]), { valid: true });
  assert.equal(evalRpn(toRpn(tokens)), 12);

  assert.equal(validateNumberUsage([50, 50], [50, 10, 7, 3, 2, 1]).valid, false);
  assert.throws(() => evalRpn(toRpn(tokenize('10/3'))), /Division must result in an integer/);
});
