const STORAGE_KEY = 'countdownPartyGameState';
const DEFAULT_SETTINGS = {
  timerDuration: 30,
  largeCount: 2,
  vowelWeights: {},
  consonantWeights: {}
};

const DEFAULT_WORDS = `
able
about
above
actor
across
acting
action
active
adopt
advice
affair
after
again
agent
agile
agree
ahead
air
alarm
album
alert
alien
align
alive
allow
almost
alone
along
alpha
also
alter
amazing
amber
amount
anchor
animal
annual
answer
anyone
apart
appeal
apple
apply
april
archive
argue
arise
armor
around
arrange
arrive
artist
aspect
assist
assume
atlas
attack
attend
august
author
autumn
avenue
awake
award
aware
awesome
awkward
balance
banana
banker
basket
battle
beach
beacon
become
before
behalf
behave
behind
believe
belong
benefit
better
between
beyond
bicycle
binary
bishop
blanket
blazing
blend
blessing
blonde
border
bottle
bottom
brain
branch
brave
bread
breeze
bridge
bright
brighter
broad
broken
brother
bucket
budget
builder
button
camera
canal
cancel
candle
captain
carbon
career
carpet
castle
casual
catalog
caught
center
central
century
certain
chamber
change
charge
charity
charmer
cheese
choice
choose
circle
citizen
classic
climate
closer
closing
clothes
coastal
coffee
collar
column
combat
comedy
coming
common
compass
complex
concept
concert
conduct
confirm
connect
consent
control
convert
corner
correct
cotton
country
courage
course
create
credit
crystal
culture
curious
custom
damage
dancer
daring
daylight
decide
deepest
default
defence
defense
degree
demand
denial
depart
desert
design
desire
detail
device
dialog
diamond
digital
direct
disease
display
distant
divide
doctor
domain
double
dragon
dream
driver
during
earlier
earning
eastern
easily
eating
economy
editor
effect
effort
either
element
elite
embark
empire
enable
ending
energy
engine
enough
ensure
entire
entry
envelope
episode
equal
equity
escape
estate
ethics
evening
event
ever
exact
example
excited
exclude
exhibit
expand
expect
expert
explain
explore
express
extreme
fabric
facing
factor
failure
fairer
family
famous
farmer
fashion
father
favour
federal
feeling
female
figure
final
finding
finish
fiscal
flight
flower
flying
follow
forest
forever
formal
format
former
fortune
forward
founder
freedom
fresher
friend
future
galaxy
garden
gather
general
gentler
gesture
global
golden
govern
grading
grand
graphic
greater
ground
growing
guarded
guess
guided
happen
harder
harmony
harvest
heading
health
hearing
heaven
height
helper
hidden
higher
hollow
honest
honour
hostel
humble
humour
hunter
hyphen
ignore
impact
import
impose
improve
include
income
indeed
indoor
inform
injury
inmate
inside
insight
instead
intense
intent
invest
invite
island
itself
jacket
january
jewel
journey
junior
keeper
kernel
kettle
kingdom
ladder
latest
launch
leader
league
leaving
legend
length
lesson
letter
liberal
library
likely
limited
listen
little
living
locate
longest
lovely
lower
loyal
lucky
lunar
magnet
making
manage
manner
manual
margin
market
master
matter
mature
maximum
medal
member
memory
mental
middle
mineral
minimum
minute
mirror
mobile
modern
modest
module
moment
monarch
money
moral
motion
moving
museum
musical
mystery
nation
native
nature
nearby
nearly
nervous
network
neutral
newest
normal
notice
november
number
object
obtain
office
officer
often
online
openly
option
orange
origin
output
overall
package
painter
palace
paper
parent
parish
partner
passage
patient
pattern
payment
peaceful
penalty
pencil
people
percent
perfect
perform
perhaps
phoenix
picture
pioneer
plastic
player
pleased
pocket
poetry
popular
portion
position
possible
posture
pottery
poverty
powder
power
precise
predict
prefer
premium
prepare
present
pretty
prevent
primary
printer
private
problem
process
produce
product
profile
program
project
promise
proper
protect
provide
public
purpose
puzzle
quality
quarter
quickly
quiet
radar
random
rather
reader
reason
recent
record
recover
region
regular
related
release
relief
remain
remote
remove
render
repair
repeat
report
rescue
reside
result
retain
retire
return
review
reward
rhythm
ribbon
rising
rocket
rolling
romance
rougher
routine
running
safely
sample
saving
school
science
season
second
secure
select
senior
series
settle
severe
shadow
shared
shelter
shining
shorter
signal
silver
simple
sincere
singer
single
sister
slower
smaller
social
softer
solder
solving
source
speech
spirit
spoken
spring
square
stable
stadium
starter
station
staying
steady
stereo
storage
storm
straight
stranger
stretch
student
studio
subject
success
sudden
suffer
summer
support
suppose
surface
survive
switch
symbol
system
talent
target
teacher
telling
tenure
thanks
theory
thicker
though
threat
thrive
ticket
timing
tobacco
today
together
tomorrow
tongue
towards
travel
treaty
trial
tribal
turning
twelve
typical
unable
unclear
under
unique
united
unless
update
upper
upward
urban
useful
using
vacant
valley
value
varied
vector
vendor
verbal
versus
vessel
victory
village
violin
vision
visual
volume
voltage
wander
warmer
warning
wealth
weather
weekly
welcome
western
whereas
whisper
winner
winter
without
wonder
working
writer
yellow
yesterday
zealous
`.trim();

const DEFAULT_CONUNDRUMS = `
triangle
reactions
learnings
integrals
reduction
mountains
paintings
treasures
breakfast
solutions
fragments
`.trim();

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

const DEFAULT_VOWEL_WEIGHTS = { A: 15, E: 21, I: 13, O: 13, U: 5 };
const DEFAULT_CONSONANT_WEIGHTS = { B: 2, C: 3, D: 6, F: 2, G: 3, H: 2, J: 1, K: 1, L: 5, M: 4, N: 8, P: 4, Q: 1, R: 9, S: 9, T: 9, V: 1, W: 1, X: 1, Y: 1, Z: 1 };

const elements = {
  teamAName: document.getElementById('teamAName'),
  teamBName: document.getElementById('teamBName'),
  teamAScore: document.getElementById('teamAScore'),
  teamBScore: document.getElementById('teamBScore'),
  newLettersBtn: document.getElementById('newLettersBtn'),
  newNumbersBtn: document.getElementById('newNumbersBtn'),
  newConundrumBtn: document.getElementById('newConundrumBtn'),
  revealBtn: document.getElementById('revealBtn'),
  nextRoundBtn: document.getElementById('nextRoundBtn'),
  resetMatchBtn: document.getElementById('resetMatchBtn'),
  timerDuration: document.getElementById('timerDuration'),
  vowelWeights: document.getElementById('vowelWeights'),
  consonantWeights: document.getElementById('consonantWeights'),
  largeCount: document.getElementById('largeCount'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  timerDisplay: document.getElementById('timerDisplay'),
  timerStartBtn: document.getElementById('timerStartBtn'),
  timerPauseBtn: document.getElementById('timerPauseBtn'),
  timerResetBtn: document.getElementById('timerResetBtn'),
  timerAnnouncements: document.getElementById('timerAnnouncements'),
  roundTitle: document.getElementById('roundTitle'),
  roundPrompt: document.getElementById('roundPrompt'),
  teamEntries: document.getElementById('teamEntries'),
  roundErrors: document.getElementById('roundErrors'),
  revealPanel: document.getElementById('revealPanel')
};

let dictionary = new Set(DEFAULT_WORDS.split('\n').map((w) => w.trim().toLowerCase()).filter(Boolean));
let conundrums = DEFAULT_CONUNDRUMS.split('\n').map((w) => w.trim().toLowerCase()).filter((w) => w.length === 9);

const state = loadState() || {
  teams: { A: { name: 'Team A', score: 0 }, B: { name: 'Team B', score: 0 } },
  settings: { ...DEFAULT_SETTINGS },
  round: null,
  timer: { remaining: 30, running: false, endTime: null }
};

let timerInterval = null;
let audioContext = null;

init();

async function init() {
  await loadDataFiles();
  hydrateSettings();
  bindEvents();
  normalizeState();
  render();
}

function normalizeState() {
  if (!state.settings) state.settings = { ...DEFAULT_SETTINGS };
  state.settings.timerDuration = clampNumber(state.settings.timerDuration, 5, 180, 30);
  state.settings.largeCount = clampNumber(state.settings.largeCount, 0, 4, 2);
  if (!state.timer) state.timer = { remaining: state.settings.timerDuration, running: false, endTime: null };
  if (!Number.isFinite(state.timer.remaining)) state.timer.remaining = state.settings.timerDuration;
}

async function loadDataFiles() {
  const loadText = async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      return await response.text();
    } catch (_err) {
      return null;
    }
  };

  const wordsText = await loadText('data/words_small.txt');
  if (wordsText) {
    dictionary = new Set(wordsText.split('\n').map((w) => w.trim().toLowerCase()).filter(Boolean));
  }

  const conundrumsText = await loadText('data/conundrums_small.txt');
  if (conundrumsText) {
    const items = conundrumsText.split('\n').map((w) => w.trim().toLowerCase()).filter((w) => w.length === 9);
    if (items.length) conundrums = items;
  }
}

function bindEvents() {
  elements.teamAName.addEventListener('input', () => updateTeamName('A', elements.teamAName.value));
  elements.teamBName.addEventListener('input', () => updateTeamName('B', elements.teamBName.value));
  elements.saveSettingsBtn.addEventListener('click', saveSettings);

  elements.newLettersBtn.addEventListener('click', () => startLettersRound());
  elements.newNumbersBtn.addEventListener('click', () => startNumbersRound());
  elements.newConundrumBtn.addEventListener('click', () => startConundrumRound());
  elements.revealBtn.addEventListener('click', revealRound);
  elements.nextRoundBtn.addEventListener('click', nextRound);
  elements.resetMatchBtn.addEventListener('click', resetMatch);

  elements.timerStartBtn.addEventListener('click', startTimer);
  elements.timerPauseBtn.addEventListener('click', pauseTimer);
  elements.timerResetBtn.addEventListener('click', resetTimer);
}

function hydrateSettings() {
  elements.teamAName.value = state.teams.A.name;
  elements.teamBName.value = state.teams.B.name;
  elements.timerDuration.value = state.settings.timerDuration;
  elements.largeCount.value = state.settings.largeCount;
  elements.vowelWeights.value = serializeWeights(DEFAULT_VOWEL_WEIGHTS, state.settings.vowelWeights, VOWELS);
  elements.consonantWeights.value = serializeWeights(DEFAULT_CONSONANT_WEIGHTS, state.settings.consonantWeights, CONSONANTS);
}

function serializeWeights(defaultMap, customMap, order) {
  if (!customMap || !Object.keys(customMap).length) return '';
  return order.map((l) => customMap[l] ?? defaultMap[l]).join(',');
}

function updateTeamName(team, name) {
  state.teams[team].name = name.trim() || `Team ${team}`;
  saveState();
  renderScoreboard();
}

function saveSettings() {
  const duration = clampNumber(Number(elements.timerDuration.value), 5, 180, 30);
  const largeCount = clampNumber(Number(elements.largeCount.value), 0, 4, 2);

  const vowelParsed = parseWeightInput(elements.vowelWeights.value, VOWELS.length);
  if (elements.vowelWeights.value.trim() && !vowelParsed) {
    showError('Invalid vowel weights. Enter five comma-separated positive integers.');
    return;
  }
  const consonantParsed = parseWeightInput(elements.consonantWeights.value, CONSONANTS.length);
  if (elements.consonantWeights.value.trim() && !consonantParsed) {
    showError('Invalid consonant weights. Enter twenty-one comma-separated positive integers.');
    return;
  }

  state.settings.timerDuration = duration;
  state.settings.largeCount = largeCount;
  state.settings.vowelWeights = vowelParsed ? zipWeights(VOWELS, vowelParsed) : {};
  state.settings.consonantWeights = consonantParsed ? zipWeights(CONSONANTS, consonantParsed) : {};
  if (!state.timer.running) state.timer.remaining = duration;

  saveState();
  showError('Settings saved.', false);
  render();
}

function parseWeightInput(value, expectedLength) {
  const items = value.split(',').map((n) => n.trim()).filter(Boolean);
  if (items.length !== expectedLength) return null;
  const numbers = items.map((x) => Number(x));
  if (numbers.some((n) => !Number.isInteger(n) || n <= 0)) return null;
  return numbers;
}

function zipWeights(letters, weights) {
  const result = {};
  letters.forEach((l, i) => { result[l] = weights[i]; });
  return result;
}

function startLettersRound() {
  const letters = generateLetters();
  state.round = {
    type: 'letters',
    letters,
    submissions: freshSubmissions(),
    revealed: false,
    scored: false
  };
  prepareRound();
}

function startNumbersRound() {
  const numbers = generateNumbers(state.settings.largeCount);
  state.round = {
    type: 'numbers',
    numbers,
    target: randomInt(100, 999),
    submissions: freshSubmissions(),
    revealed: false,
    scored: false,
    official: null
  };
  prepareRound();
}

function startConundrumRound() {
  const solution = conundrums[Math.floor(Math.random() * conundrums.length)] || 'triangle';
  state.round = {
    type: 'conundrum',
    solution,
    anagram: shuffle(solution.toUpperCase().split('')).join(''),
    submissions: freshSubmissions(),
    buzz: { lockedUntil: 0, activeTeam: null },
    revealed: false,
    scored: false
  };
  prepareRound();
}

function prepareRound() {
  showError('');
  state.timer.remaining = state.settings.timerDuration;
  state.timer.running = false;
  state.timer.endTime = null;
  saveState();
  render();
}

function freshSubmissions() {
  return {
    A: { value: '', submitted: false, valid: false, score: 0, meta: '' },
    B: { value: '', submitted: false, valid: false, score: 0, meta: '' }
  };
}

function generateLetters() {
  const vowelWeights = { ...DEFAULT_VOWEL_WEIGHTS, ...state.settings.vowelWeights };
  const consonantWeights = { ...DEFAULT_CONSONANT_WEIGHTS, ...state.settings.consonantWeights };

  const letters = [];
  for (let i = 0; i < 3; i += 1) letters.push(weightedPick(VOWELS, vowelWeights));
  for (let i = 0; i < 4; i += 1) letters.push(weightedPick(CONSONANTS, consonantWeights));
  for (let i = 0; i < 2; i += 1) {
    const pickVowel = Math.random() < 0.4;
    letters.push(weightedPick(pickVowel ? VOWELS : CONSONANTS, pickVowel ? vowelWeights : consonantWeights));
  }
  return shuffle(letters);
}

function generateNumbers(largeCount) {
  const largePool = [25, 50, 75, 100];
  const smallPool = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

  const large = shuffle([...largePool]).slice(0, largeCount);
  const small = [];
  const bag = [...smallPool];
  while (small.length < 6 - largeCount && bag.length) {
    small.push(bag.splice(Math.floor(Math.random() * bag.length), 1)[0]);
  }
  return shuffle([...large, ...small]);
}

function weightedPick(letters, map) {
  const total = letters.reduce((sum, l) => sum + map[l], 0);
  let roll = Math.random() * total;
  for (const letter of letters) {
    roll -= map[letter];
    if (roll <= 0) return letter;
  }
  return letters[letters.length - 1];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function render() {
  renderScoreboard();
  renderTimer();
  renderRound();
}

function renderScoreboard() {
  elements.teamAScore.textContent = state.teams.A.score;
  elements.teamBScore.textContent = state.teams.B.score;
}

function renderTimer() {
  elements.timerDisplay.textContent = Math.max(0, Math.ceil(state.timer.remaining));
}

function renderRound() {
  const round = state.round;
  elements.teamEntries.innerHTML = '';
  elements.revealPanel.innerHTML = '';

  if (!round) {
    elements.roundTitle.textContent = 'No active round';
    elements.roundPrompt.textContent = 'Start a round to begin.';
    return;
  }

  if (round.type === 'letters') {
    elements.roundTitle.textContent = 'Letters Round';
    elements.roundPrompt.textContent = round.letters.join(' ');
    renderTextSubmissions('letters', 'Enter word');
  }

  if (round.type === 'numbers') {
    elements.roundTitle.textContent = 'Numbers Round';
    elements.roundPrompt.textContent = `${round.numbers.join('  ')}   |   Target: ${round.target}`;
    renderTextSubmissions('numbers', 'Enter arithmetic expression');
  }

  if (round.type === 'conundrum') {
    elements.roundTitle.textContent = 'Conundrum';
    elements.roundPrompt.textContent = round.anagram.split('').join(' ');
    renderConundrumInputs();
  }

  if (round.revealed) {
    renderReveal();
  }
}

function renderTextSubmissions(type, placeholder) {
  ['A', 'B'].forEach((team) => {
    const row = document.createElement('div');
    row.className = 'entry-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `${state.teams[team].name}: ${placeholder}`;
    input.value = state.round.submissions[team].value;
    input.addEventListener('input', () => {
      state.round.submissions[team].value = input.value;
      saveState();
    });

    const submit = document.createElement('button');
    submit.textContent = 'Submit';
    submit.disabled = state.round.revealed;
    submit.addEventListener('click', () => submitTeamAnswer(team, type));

    row.append(input, submit);
    elements.teamEntries.appendChild(row);
  });
}

function renderConundrumInputs() {
  ['A', 'B'].forEach((team) => {
    const row = document.createElement('div');
    row.className = 'entry-row';
    const wrapper = document.createElement('div');

    const buzzBtn = document.createElement('button');
    buzzBtn.textContent = `${state.teams[team].name} BUZZ`;
    const locked = Date.now() < (state.round.buzz.lockedUntil || 0);
    buzzBtn.disabled = state.round.revealed || locked || state.round.buzz.activeTeam === team;
    buzzBtn.addEventListener('click', () => buzz(team));

    wrapper.appendChild(buzzBtn);

    if (state.round.buzz.activeTeam === team && !state.round.revealed) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Conundrum answer';
      input.value = state.round.submissions[team].value;
      input.addEventListener('input', () => {
        state.round.submissions[team].value = input.value;
        saveState();
      });
      wrapper.appendChild(input);

      const submit = document.createElement('button');
      submit.textContent = 'Submit';
      submit.addEventListener('click', () => submitTeamAnswer(team, 'conundrum'));
      wrapper.appendChild(submit);
    }

    row.appendChild(wrapper);
    elements.teamEntries.appendChild(row);
  });
}

function submitTeamAnswer(team, type) {
  showError('');
  if (!state.round || state.round.revealed) return;
  if (type === 'letters') evaluateLettersSubmission(team);
  if (type === 'numbers') evaluateNumbersSubmission(team);
  if (type === 'conundrum') evaluateConundrumSubmission(team);
  saveState();
  renderRound();
}

function evaluateLettersSubmission(team) {
  const submission = state.round.submissions[team];
  const word = submission.value.trim().toLowerCase();
  submission.submitted = true;

  const letterCheck = validateWordUsesLetters(word, state.round.letters);
  if (!letterCheck.valid) {
    submission.valid = false;
    submission.meta = letterCheck.error;
    return;
  }

  if (!dictionary.has(word)) {
    submission.valid = false;
    submission.meta = 'Word not in dictionary.';
    return;
  }

  submission.valid = true;
  submission.meta = 'Valid';
  submission.score = word.length === 9 ? 18 : word.length;
}

function validateWordUsesLetters(word, letters) {
  if (!/^[a-z]+$/.test(word)) return { valid: false, error: 'Use letters only, no spaces/hyphens.' };
  const counts = {};
  letters.forEach((l) => { counts[l] = (counts[l] || 0) + 1; });

  for (const ch of word.toUpperCase()) {
    if (!counts[ch]) return { valid: false, error: `That word uses an extra ${ch}.` };
    counts[ch] -= 1;
  }
  return { valid: true };
}

function evaluateNumbersSubmission(team) {
  const submission = state.round.submissions[team];
  const expr = submission.value.trim();
  submission.submitted = true;

  try {
    const tokens = tokenize(expr);
    const numbersUsed = tokens.filter((t) => t.type === 'number').map((t) => t.value);
    const usageCheck = validateNumberUsage(numbersUsed, state.round.numbers);
    if (!usageCheck.valid) {
      submission.valid = false;
      submission.meta = usageCheck.error;
      return;
    }

    const rpn = toRpn(tokens);
    const value = evalRpn(rpn);
    submission.valid = true;
    submission.meta = `Value ${value}`;
    submission.result = value;
  } catch (err) {
    submission.valid = false;
    submission.meta = err.message || 'Invalid arithmetic.';
  }
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

function evaluateConundrumSubmission(team) {
  const sub = state.round.submissions[team];
  const val = sub.value.trim().toLowerCase();
  sub.submitted = true;
  if (val === state.round.solution) {
    sub.valid = true;
    sub.meta = 'Correct!';
    sub.score = 10;
  } else {
    sub.valid = false;
    sub.meta = 'Incorrect conundrum answer.';
  }
  state.round.buzz.activeTeam = null;
}

function buzz(team) {
  if (!state.round || state.round.type !== 'conundrum') return;
  state.round.buzz.activeTeam = team;
  state.round.buzz.lockedUntil = Date.now() + 3000;
  saveState();
  renderRound();
}

function revealRound() {
  if (!state.round || state.round.revealed) return;
  state.round.revealed = true;
  pauseTimer();

  if (state.round.type === 'letters') scoreLettersRound();
  if (state.round.type === 'numbers') scoreNumbersRound();
  if (state.round.type === 'conundrum') scoreConundrumRound();

  saveState();
  renderRound();
}

function scoreLettersRound() {
  if (state.round.scored) return;
  const a = state.round.submissions.A;
  const b = state.round.submissions.B;

  const aLen = a.valid ? (a.value.trim().length) : 0;
  const bLen = b.valid ? (b.value.trim().length) : 0;

  if (aLen > bLen) state.teams.A.score += a.score;
  if (bLen > aLen) state.teams.B.score += b.score;
  if (aLen > 0 && aLen === bLen) {
    state.teams.A.score += a.score;
    state.teams.B.score += b.score;
  }

  state.round.longest = findLongestWordFromLetters(state.round.letters);
  state.round.scored = true;
}

function findLongestWordFromLetters(letters) {
  let best = '';
  for (const word of dictionary) {
    if (word.length < best.length) continue;
    const check = validateWordUsesLetters(word, letters);
    if (check.valid && word.length >= best.length) best = word;
  }
  return best || 'No match found';
}

function scoreNumbersRound() {
  if (state.round.scored) return;
  const target = state.round.target;
  const a = state.round.submissions.A;
  const b = state.round.submissions.B;

  const aDelta = a.valid ? Math.abs(target - a.result) : Infinity;
  const bDelta = b.valid ? Math.abs(target - b.result) : Infinity;

  if (aDelta < bDelta) state.teams.A.score += pointsForDelta(aDelta);
  if (bDelta < aDelta) state.teams.B.score += pointsForDelta(bDelta);
  if (aDelta !== Infinity && aDelta === bDelta) {
    state.teams.A.score += pointsForDelta(aDelta);
    state.teams.B.score += pointsForDelta(bDelta);
  }

  state.round.official = solveNumbers(state.round.numbers, target);
  state.round.scored = true;
}

function pointsForDelta(delta) {
  if (delta === 0) return 10;
  if (delta <= 5) return 7;
  if (delta <= 10) return 5;
  return 0;
}

function solveNumbers(numbers, target) {
  let best = { value: null, expr: 'No solution found', delta: Infinity };
  const initial = numbers.map((n) => ({ value: n, expr: String(n) }));

  function recurse(nodes) {
    for (const node of nodes) {
      const delta = Math.abs(node.value - target);
      if (delta < best.delta) {
        best = { value: node.value, expr: node.expr, delta };
        if (delta === 0) return;
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = 0; j < nodes.length; j += 1) {
        if (i === j) continue;
        const rest = nodes.filter((_, idx) => idx !== i && idx !== j);
        const a = nodes[i];
        const b = nodes[j];

        const candidates = [
          { value: a.value + b.value, expr: `(${a.expr}+${b.expr})` },
          { value: a.value - b.value, expr: `(${a.expr}-${b.expr})` },
          { value: a.value * b.value, expr: `(${a.expr}*${b.expr})` }
        ];
        if (b.value !== 0 && a.value % b.value === 0) {
          candidates.push({ value: a.value / b.value, expr: `(${a.expr}/${b.expr})` });
        }

        for (const c of candidates) {
          if (!Number.isInteger(c.value)) continue;
          recurse([...rest, c]);
          if (best.delta === 0) return;
        }
      }
    }
  }

  recurse(initial);
  return best;
}

function scoreConundrumRound() {
  if (state.round.scored) return;
  for (const team of ['A', 'B']) {
    if (state.round.submissions[team].valid) state.teams[team].score += 10;
  }
  state.round.scored = true;
}

function renderReveal() {
  const round = state.round;
  if (round.type === 'letters') {
    elements.revealPanel.innerHTML = `
      <h3>Reveal</h3>
      <p>${state.teams.A.name}: ${formatLetterResult(round.submissions.A)}</p>
      <p>${state.teams.B.name}: ${formatLetterResult(round.submissions.B)}</p>
      <p><strong>Longest possible word:</strong> ${round.longest}</p>
    `;
  }

  if (round.type === 'numbers') {
    const aDelta = round.submissions.A.valid ? Math.abs(round.target - round.submissions.A.result) : 'invalid';
    const bDelta = round.submissions.B.valid ? Math.abs(round.target - round.submissions.B.result) : 'invalid';
    elements.revealPanel.innerHTML = `
      <h3>Reveal</h3>
      <p>${state.teams.A.name}: ${formatNumbersResult(round.submissions.A)} (delta: ${aDelta})</p>
      <p>${state.teams.B.name}: ${formatNumbersResult(round.submissions.B)} (delta: ${bDelta})</p>
      <p><strong>Official solution:</strong> ${round.official.expr} = ${round.official.value} (delta ${round.official.delta})</p>
    `;
  }

  if (round.type === 'conundrum') {
    elements.revealPanel.innerHTML = `
      <h3>Reveal</h3>
      <p>${state.teams.A.name}: ${round.submissions.A.meta || 'No answer'}</p>
      <p>${state.teams.B.name}: ${round.submissions.B.meta || 'No answer'}</p>
      <p><strong>Correct word:</strong> ${round.solution}</p>
    `;
  }
}

function formatLetterResult(sub) {
  if (!sub.submitted) return 'No submission';
  return `${sub.value || '(empty)'} - ${sub.valid ? `valid (${sub.score} pts)` : `invalid (${sub.meta})`}`;
}
function formatNumbersResult(sub) {
  if (!sub.submitted) return 'No submission';
  if (!sub.valid) return `Invalid (${sub.meta})`;
  const delta = Math.abs(state.round.target - sub.result);
  return `${sub.value} = ${sub.result}, points ${pointsForDelta(delta)}`;
}

function nextRound() {
  state.round = null;
  state.timer.running = false;
  state.timer.endTime = null;
  state.timer.remaining = state.settings.timerDuration;
  showError('');
  saveState();
  render();
}

function resetMatch() {
  state.teams.A.score = 0;
  state.teams.B.score = 0;
  nextRound();
  saveState();
}

function startTimer() {
  if (state.timer.running) return;
  state.timer.running = true;
  state.timer.endTime = Date.now() + state.timer.remaining * 1000;

  timerInterval = setInterval(() => {
    state.timer.remaining = Math.max(0, (state.timer.endTime - Date.now()) / 1000);
    renderTimer();
    if (state.timer.remaining <= 0) {
      pauseTimer();
      beep();
      elements.timerAnnouncements.textContent = 'Time is up.';
    }
    saveState();
  }, 100);

  saveState();
}

function pauseTimer() {
  if (!state.timer.running) return;
  clearInterval(timerInterval);
  timerInterval = null;
  state.timer.running = false;
  state.timer.endTime = null;
  saveState();
}

function resetTimer() {
  pauseTimer();
  state.timer.remaining = state.settings.timerDuration;
  renderTimer();
  saveState();
}

function beep() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.frequency.value = 880;
  osc.type = 'sine';
  gain.gain.value = 0.08;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.25);
}

function showError(message, isError = true) {
  elements.roundErrors.style.color = isError ? '#b72a2a' : '#1c6d3b';
  elements.roundErrors.textContent = message;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}
