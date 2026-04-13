const CONUNDRUM_SUBMISSION_REJECTED = 'Submission rejected: team must buzz in before answering.';

function canSubmitConundrum(round, team) {
  return Boolean(round && round.type === 'conundrum' && !round.revealed && !round.solved && round.buzz && round.buzz.activeTeam === team);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONUNDRUM_SUBMISSION_REJECTED,
    canSubmitConundrum
  };
}

if (typeof window !== 'undefined') {
  window.ConundrumGuards = {
    CONUNDRUM_SUBMISSION_REJECTED,
    canSubmitConundrum
  };
}
