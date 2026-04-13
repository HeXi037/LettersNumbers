# Countdown Party Game

A self-contained browser game inspired by **Countdown** / **8 Out of 10 Cats Does Countdown** with two-team play, local persistence, and no back-end.

## Run the app

- **Option 1:** Open `index.html` directly in your browser.
- **Option 2:** Serve statically and open in browser:

```bash
python -m http.server
```

Then visit `http://localhost:8000`.

> The game is fully client-side (HTML/CSS/JS) and works offline.

## Rounds and scoring

### 1) Letters round
- The host performs **9 manual draws**, choosing **Vowel** or **Consonant** each time.
- The letter set is built incrementally from the chosen class on each draw.
- Any mix is valid, including edge cases like **9 vowels / 0 consonants** or **0 vowels / 9 consonants**.
- Teams submit their best word before reveal.
- A word is valid only if:
  - it uses only available letters (respecting multiplicity), and
  - it exists in the loaded dictionary.
- Scoring:
  - 1 point per letter,
  - **9-letter word = 18 points** (double for a full nine).
- **Each valid team submission scores independently** (both teams can score in the same letters round).
- Reveal shows both submissions and the longest dictionary word possible from the letters.

### 2) Numbers round
- 6 numbers generated from:
  - large: `25, 50, 75, 100`
  - small: `1-10` (two copies each)
- Target is a random integer from **100-999**.
- Teams submit arithmetic expressions using `+ - * /` and parentheses.
- Rules:
  - no `eval()` (custom tokenizer/parser/evaluator),
  - each provided number may be used **at most once**,
  - division must produce an integer at every division step.
- Scoring (closer valid submission wins; ties award both):
  - exact: 10
  - within 5: 7
  - within 10: 5
  - otherwise: 0
- Reveal shows both submissions and an official brute-force best/optimal solution.

#### Valid numbers examples
- `(75+3)*4`
- `(100-25)+6`
- `(50/10)+7` (valid: intermediate division is integer)

### 3) Conundrum
- One random 9-letter solution is picked from the conundrum list.
- The UI shows a shuffled anagram.
- Teams use BUZZ; buzzing locks out the other team for 3 seconds.
- The **first correct answer immediately wins the round**, awards 10 points to that team only, and locks further buzz/submissions.
- Reveal shows the correct solution if nobody gets it.

## Settings

- Timer duration (default 30 seconds)
- Letter distribution overrides (vowel and consonant weighted lists)
- Number of large numbers (0-4) for the next numbers round

## Persistence

Current match state is stored in `localStorage`, including:
- team names
- team scores
- active round details and submissions
- timer state
- settings

## Data files

- `data/words_small.txt` — newline-separated dictionary words
- `data/conundrums_small.txt` — newline-separated 9-letter conundrum solutions

### Replacing with larger lists

You can swap in larger files as long as they remain newline-separated plain text:
- replace `data/words_small.txt` with a larger dictionary
- replace `data/conundrums_small.txt` with more 9-letter answers

No code changes are needed if the format stays the same.
