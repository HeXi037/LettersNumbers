const DEFAULT_TEAMS = {
  A: { name: 'Team A', score: 0 },
  B: { name: 'Team B', score: 0 }
};

function normalizeTeam(team, fallback) {
  const source = team && typeof team === 'object' ? team : {};
  const safeName = typeof source.name === 'string' && source.name.trim() ? source.name.trim() : fallback.name;
  const safeScore = Number.isFinite(source.score) ? source.score : fallback.score;
  return {
    name: safeName,
    score: safeScore
  };
}

function normalizeTeams(teams) {
  const source = teams && typeof teams === 'object' ? teams : {};
  return {
    A: normalizeTeam(source.A, DEFAULT_TEAMS.A),
    B: normalizeTeam(source.B, DEFAULT_TEAMS.B)
  };
}

function normalizePersistedState(state, defaultSettings) {
  const normalized = state && typeof state === 'object' ? state : {};
  normalized.teams = normalizeTeams(normalized.teams);
  if (!normalized.settings || typeof normalized.settings !== 'object') normalized.settings = { ...defaultSettings };
  return normalized;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEFAULT_TEAMS,
    normalizeTeam,
    normalizeTeams,
    normalizePersistedState
  };
}

if (typeof window !== 'undefined') {
  window.StateNormalization = {
    DEFAULT_TEAMS,
    normalizeTeam,
    normalizeTeams,
    normalizePersistedState
  };
}
