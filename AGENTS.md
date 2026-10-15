# AGENTS.md — Grammar Desk

Guidance for AI agents (and humans) working on this project.

## What this is
A static English-grammar learning site for levels **A1, A2, B1, B2, C1/C2**, available in
**English, Russian and Uzbek**. Plain HTML/CSS/JS, **no build step, no dependencies**
(only Google Fonts loaded from CDN). Open any `.html` file directly in a browser.

## Repo & deploy
- GitHub: `Thunder1202/grammar-desk` (public). `gh` is authenticated on this machine.
- GitHub Pages serves the repo root: **https://thunder1202.github.io/grammar-desk/**
- The live site is served from GitHub, **not** the local folder. Local edits only appear
  online after they are committed and pushed:
  ```
  git add -A
  git commit -m "describe change"
  git push
  ```
  Pages rebuilds automatically in ~1 minute; the URL never changes.
- Line-ending warnings (`LF will be replaced by CRLF`) are harmless on Windows.

## File map
- `index.html` — home: hero + 5 level links.
- `a1.html a2.html b1.html b2.html c1.html` — level pages: list of topic links (`.menu > li > a.lv`)
  with a hover/tap preview (`.tp` with `.tl[data-l]` in 3 languages).
- `*.html` (all other files) — one lesson/topic per file.
- `style.css` — all styling, including the 4 theme skins.
- `app.js` — all behaviour: theme cycling, page transitions, click bursts, pointer trail,
  kinetic headings, scroll bar, and the **UI language translator**.
- `favicon.svg` — site icon.

## Topic inventory (keep this in sync)
Counts and the current topic file (slug) per level. If you add or remove a topic, update
this list **and** the count text in `index.html`, the level hero, and the `TR` keys in
`app.js` (see "Adding a new topic").

- **A1 — Beginner (19):** to-be, possessives, present-simple, present-continuous,
  present-simple-vs-continuous, there-is-there-are, countable-and-uncountable-nouns,
  articles-a-an-the, past-simple-of-to-be, past-simple, can-cant, have-got,
  prepositions-of-place-and-time, question-forms, demonstratives, imperatives, plural-nouns,
  possessive-pronouns, basic-linkers
- **A2 — Elementary (16):** future-going-to, future-arrangements-and-will,
  comparatives-and-superlatives, quantifiers, present-perfect-basic, past-continuous,
  object-pronouns, modals-must-have-to-should, too-enough-too-much-many, question-tags,
  infinitive-vs-gerund, indefinite-pronouns, adjectives-and-adverbs,
  prepositions-of-movement, zero-conditional, time-clauses
- **B1 — Intermediate (18):** present-perfect-vs-past-simple, present-perfect-continuous,
  past-perfect, future-forms-review, first-conditional, second-conditional,
  passive-voice-present-and-past, modals-of-deduction, reported-speech-statements,
  relative-clauses, used-to-would, gerund-and-infinitive, articles-review, phrasal-verbs,
  reflexive-and-reciprocal-pronouns, so-and-neither, past-perfect-continuous, so-and-such
- **B2 — Upper-intermediate (14):** third-conditional, mixed-conditionals,
  passive-voice-all-tenses, reported-speech-full, future-perfect-and-continuous,
  past-modals-of-deduction, perfect-modals, relative-clauses-advanced, wish-if-only,
  causative-have-get-something-done, inversion-basic, linking-words-and-cohesion,
  advanced-articles-and-determiners, future-in-the-past
- **C1/C2 — Advanced (10):** inversion-full, emphasis-cleft-sentences, nominalisation,
  participle-clauses, subjunctive-and-unreal-past, advanced-passives, alternatives-to-if,
  register-and-style, cohesive-devices-for-writing, ellipsis-and-substitution

The four count strings that must agree everywhere:
`index.html` spans (`Beginner · 19 topics`, `Elementary · 16 topics`, `Intermediate · 18 topics`,
`Upper-intermediate · 14 topics`, `Advanced · 10 topics`), each level hero
(`Beginner. 19 topics. Choose one.` …), and the matching `TR` entries in `app.js`
(both the `· N topics` and the `N topics. Choose one.` forms, in English/Russian/Uzbek).

## Page conventions (every page)
- `<html lang="en" data-skin="p3" data-lang="en">`.
- `<head>`: charset, viewport, `<title>X - Grammar Desk</title>`, then a block of
  `<meta name="description">`, `<link rel="icon" href="favicon.svg">`, `theme-color`,
  `og:*` and `twitter:*` tags, then the Google Fonts link, then a small **inline script**
  (reads `gd-theme`/`gd-lang` from storage before paint), then `style.css`.
- `<body>`: `<header class="top">` = logo + `.hctl` (language group `.lgb` + theme `.chip`),
  then page content inside `.wrap`, then `<script src="app.js">`.
- When adding a page, copy an existing page's `<head>`, header and footer and only change
  `<title>`/`<meta>` content.

## Lesson template
Each topic page uses a 5-pane layout:
```
<div class="lay">
  <div class="side" role="tablist"> ...5 x <button class="sn" data-act="sec" data-to="pN"> ... </div>
  <div>
    <div class="lgb"> EN / RU / UZ buttons </div>
    <section class="card pane" id="p1"> ... <button class="go" data-act="sec" data-to="p2"> ... </section>
    <section class="card pane" id="p2" hidden> ... </section>
    ... p3, p4, p5 ...
  </div>
</div>
```
- Panes: 1 General info, 2 Teacher's rule, 3 Student explanation, 4 Real-life use,
  5 Examples and drill. `p1` visible; `p2`–`p5` have `hidden`.
- Each pane contains one `.lg` per language: `<div class="lg" data-l="en|ru|uz">`.
  **All three are required** on lesson content.
- Practice items: `<div class="q">question <button class="ab" data-act="ans" aria-expanded="false" aria-controls="aN">Answer</button><div class="ans" id="aN" hidden>...</div></div>`.
  `id` values must be unique within the page.
- Panes 4 and 5 usually end with `<p class="tag">English only</p>`.

## Internationalisation (two systems — both must be respected)
1. **Lesson content**: elements marked `.lg[data-l=xx]`; CSS shows only the block matching
   `html[data-lang=xx]`. Add a matching `.lg` block for every new lesson text.
2. **UI chrome** (home, level pages, nav tabs, headings, `Next:` buttons, `Answer`/`Hide`,
   breadcrumb "Home", "English only", level descriptions, "Theme:"): translated at runtime
   by the `TR` dictionary in `app.js`, keyed by the **exact English string**.
   - If you introduce new UI text, add a `TR` entry `{ru:..., uz:...}` (English is the key
     and the fallback). Keys must match character-for-character, including `·` and `'`.
   - `app.js` walks text nodes in `.wrap`, caches the originals, and re-renders on change.

## Themes / skins
- Skins: `p3`, `p4`, `p5`, `basic` (Persona 3/4/5 + plain). Set via `<html data-skin>`,
  stored in `localStorage['gd-theme']`, cycled by the header chip. Each skin has its own
  variables, motion, page-transition and particle styles in `style.css`.
- `prefers-reduced-motion` is fully honoured — keep it that way for any new animation.

## Language switching
- `data-lang` on `<html>` (`en`/`ru`/`uz`), stored in `localStorage['gd-lang']`,
  `documentElement.lang` kept in sync. Switcher buttons: `data-act="lang" data-l="xx"`.
  The header switcher and the in-lesson `.lgb` switcher are both driven by `app.js`.

## Adding a new topic
1. Copy an existing lesson file and rename it to the topic slug (e.g. `present-simple.html`).
2. Update `<title>`, `<meta>`, the `<h1>`, breadcrumb, and all five panes (with `.lg` x3).
3. **Link it** from the correct level page: add an `<li>` to `.menu` on `a1..c1.html`, with
   `.lv > b` (title) + `.lv span` ("Open topic") + a `.tp` preview containing `.tl[data-l]`
   for en/ru/uz.
4. If the level page's topic count changes, update it in **all four** places: the `index.html`
   span, the level page hero, that level page's `<meta name="description">` / `og:description`
   / `twitter:description`, and both `TR` keys in `app.js` (the `· N topics` and the
   `N topics. Choose one.` forms, in en/ru/uz). Then update the inventory list above.
5. Quick verification: `node --check app.js`; count `class="lv"` links on the level page;
   and check every `href="*.html"` resolves to a real file.

## Adding a new level
Create `x.html` from an existing level page, add it to `.menu` on `index.html`, and add the
hero/`TR` strings for the new level.

## Work log / status (update when you finish a batch)
- Last pushed commit: `a3413f2 Add AGENTS.md project guide`.
- **Not yet pushed / not live:** a batch of new lesson pages plus edits to the level pages,
  `index.html`, `app.js` and this file. New topics added this round:
  - A1: `demonstratives`, `imperatives`, `plural-nouns`, `possessive-pronouns`, `basic-linkers`
  - A2: `indefinite-pronouns`, `adjectives-and-adverbs`, `prepositions-of-movement`,
    `zero-conditional`, `time-clauses`
  - B1: `reflexive-and-reciprocal-pronouns`, `so-and-neither`, `past-perfect-continuous`,
    `so-and-such`
  - B2: `future-in-the-past`
  - C1: `ellipsis-and-substitution`
- All levels are wired and counts reconciled to **A1=19, A2=16, B1=18, B2=14, C1=10**.
  Verified: `node --check app.js` passes, every internal link resolves, and each new page
  has panes `p1`–`p5` with 8 drill answers.
- Next step to publish: `git add -A && git commit -m "..." && git push` (the live site only
  changes after a push).

## Local preview
Open `index.html` directly, or run `npx --yes serve "."` in this folder and visit the URL.

## Gotchas
- A new `.html` file is unreachable until it is linked from a level page.
- `.ans` `id`s are referenced by `aria-controls` — keep them unique per page.
- The `TR` dictionary is exact-match; typos silently leave English text untranslated.
- Keep `<meta>` tags per page; Pages has no server, so SEO/social relies on them.
