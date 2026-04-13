(function initGameLogic(globalScope) {
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];
  const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

  const DEFAULT_VOWEL_WEIGHTS = { A: 15, E: 21, I: 13, O: 13, U: 5 };
  const DEFAULT_CONSONANT_WEIGHTS = { B: 2, C: 3, D: 6, F: 2, G: 3, H: 2, J: 1, K: 1, L: 5, M: 4, N: 8, P: 4, Q: 1, R: 9, S: 9, T: 9, V: 1, W: 1, X: 1, Y: 1, Z: 1 };

  function weightedPick(letters, map, randomFn = Math.random) {
    const total = letters.reduce((sum, l) => sum + map[l], 0);
    let roll = randomFn() * total;
    for (const letter of letters) {
      roll -= map[letter];
      if (roll <= 0) return letter;
    }
    return letters[letters.length - 1];
  }

  function generateLettersFromSequence(sequence, vowelOverrides = {}, consonantOverrides = {}, randomFn = Math.random) {
    const vowelWeights = { ...DEFAULT_VOWEL_WEIGHTS, ...vowelOverrides };
    const consonantWeights = { ...DEFAULT_CONSONANT_WEIGHTS, ...consonantOverrides };
    return sequence.map((pick) => {
      if (pick === 'vowel') return weightedPick(VOWELS, vowelWeights, randomFn);
      if (pick === 'consonant') return weightedPick(CONSONANTS, consonantWeights, randomFn);
      throw new Error(`Unsupported draw type: ${pick}`);
    });
  }

  function scoreLettersSubmissions(submissions) {
    let aScore = 0;
    let bScore = 0;
    if (submissions.A.valid) aScore = submissions.A.score;
    if (submissions.B.valid) bScore = submissions.B.score;
    return { A: aScore, B: bScore };
  }

  function applyConundrumAnswer(round, team, answer) {
    if (round.solved) {
      return { accepted: false, alreadySolved: true, correct: false };
    }
    const normalized = answer.trim().toLowerCase();
    if (normalized === round.solution) {
      round.solved = true;
      round.winnerTeam = team;
      return { accepted: true, alreadySolved: false, correct: true };
    }
    return { accepted: true, alreadySolved: false, correct: false };
  }

  function tokenize(expr) {
    if (!expr) throw new Error('Enter an arithmetic expression.');
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
      if (/\s/.test(ch)) { i += 1; continue; }
      if (/\d/.test(ch)) {
        let num = ch;
        i += 1;
        while (i < expr.length && /\d/.test(expr[i])) {
          num += expr[i];
          i += 1;
        }
        tokens.push({ type: 'number', value: Number(num) });
        continue;
      }
      if ('+-*/()'.includes(ch)) {
        tokens.push({ type: ch === '(' || ch === ')' ? 'paren' : 'op', value: ch });
        i += 1;
        continue;
      }
      throw new Error(`Unexpected character "${ch}".`);
    }
    return tokens;
  }

  function validateNumberUsage(numbersUsed, available) {
    const counts = {};
    available.forEach((n) => { counts[n] = (counts[n] || 0) + 1; });
    for (const n of numbersUsed) {
      if (!counts[n]) return { valid: false, error: `Invalid arithmetic – ${n} is not available or used too many times.` };
      counts[n] -= 1;
    }
    return { valid: true };
  }

  function toRpn(tokens) {
    const out = [];
    const stack = [];
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
    for (const token of tokens) {
      if (token.type === 'number') out.push(token);
      else if (token.type === 'op') {
        while (stack.length && stack[stack.length - 1].type === 'op' && prec[stack[stack.length - 1].value] >= prec[token.value]) {
          out.push(stack.pop());
        }
        stack.push(token);
      } else if (token.value === '(') {
        stack.push(token);
      } else if (token.value === ')') {
        while (stack.length && stack[stack.length - 1].value !== '(') out.push(stack.pop());
        if (!stack.length) throw new Error('Mismatched parentheses.');
        stack.pop();
      }
    }
    while (stack.length) {
      const token = stack.pop();
      if (token.value === '(') throw new Error('Mismatched parentheses.');
      out.push(token);
    }
    return out;
  }

  function evalRpn(rpn) {
    const stack = [];
    for (const token of rpn) {
      if (token.type === 'number') {
        stack.push(token.value);
        continue;
      }
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) throw new Error('Malformed expression.');
      let result;
      if (token.value === '+') result = a + b;
      if (token.value === '-') result = a - b;
      if (token.value === '*') result = a * b;
      if (token.value === '/') {
        if (b === 0 || a % b !== 0) throw new Error('Division must result in an integer at each step.');
        result = a / b;
      }
      stack.push(result);
    }
    if (stack.length !== 1 || !Number.isInteger(stack[0])) throw new Error('Malformed expression.');
    return stack[0];
  }

  const api = {
    VOWELS,
    CONSONANTS,
    DEFAULT_VOWEL_WEIGHTS,
    DEFAULT_CONSONANT_WEIGHTS,
    weightedPick,
    generateLettersFromSequence,
    scoreLettersSubmissions,
    applyConundrumAnswer,
    tokenize,
    validateNumberUsage,
    toRpn,
    evalRpn
  };

  globalScope.GameLogic = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
}(typeof window !== 'undefined' ? window : globalThis));
