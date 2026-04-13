const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePersistedState } = require('../stateNormalization.js');
const { canSubmitConundrum, CONUNDRUM_SUBMISSION_REJECTED } = require('../conundrumGuards.js');

const DEFAULT_SETTINGS = {
  timerDuration: 30,
  largeCount: 2,
  vowelWeights: {},
  consonantWeights: {}
};

test('normalizePersistedState restores missing team objects and default values', () => {
  const malformedState = {
    teams: 'oops',
    settings: { timerDuration: 45 }
  };

  const normalized = normalizePersistedState(malformedState, DEFAULT_SETTINGS);

  assert.deepEqual(normalized.teams, {
    A: { name: 'Team A', score: 0 },
    B: { name: 'Team B', score: 0 }
  });
  assert.equal(normalized.settings.timerDuration, 45);
});

test('normalizePersistedState sanitizes malformed team shape while preserving valid fields', () => {
  const malformedState = {
    teams: {
      A: { name: '  ', score: Number.NaN },
      B: { name: 'Beta', score: 12 }
    }
  };

  const normalized = normalizePersistedState(malformedState, DEFAULT_SETTINGS);

  assert.deepEqual(normalized.teams, {
    A: { name: 'Team A', score: 0 },
    B: { name: 'Beta', score: 12 }
  });
});

test('canSubmitConundrum blocks lockout bypass attempts by non-active team', () => {
  const round = {
    type: 'conundrum',
    revealed: false,
    solved: false,
    buzz: { activeTeam: 'A', lockedUntil: Date.now() + 3000 }
  };

  assert.equal(canSubmitConundrum(round, 'A'), true);
  assert.equal(canSubmitConundrum(round, 'B'), false);
  assert.match(CONUNDRUM_SUBMISSION_REJECTED, /must buzz in/i);
});
