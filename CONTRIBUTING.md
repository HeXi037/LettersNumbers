# Contributing

Thanks for contributing to Countdown Party Game.

## Setup

1. Install Node.js 20+.
2. Install dependencies (none required currently, but this keeps workflow consistent):
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

## Quality checks

Before opening a PR, run:

```bash
npm run check
```

This runs unit tests plus data integrity checks.

## Coding conventions

- Keep the app dependency-light and browser-first (plain HTML/CSS/JS).
- Prefer small, single-purpose functions and clear naming.
- Preserve existing gameplay/scoring rules unless explicitly changing specs.
- Add or update tests when adjusting parser, scoring, or conundrum behavior.
- Keep data files newline-delimited and normalized to lowercase letters.
