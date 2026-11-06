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
  kinetic headings, scroll bar, the **topic search**, and the **UI language translator**.
- `search-data.js` — generated search index (`window.GD_Search`). Do not hand-edit.
- `gen-search.js` — the generator that rebuilds `search-data.js` (Node, no deps).
- `favicon.svg` — site icon.
- `practice.html` — **Practice Arena** hub (linked from the home page under "Practice"): a `.menu` of quizzes.
- `practice-<topic>.html` — one quiz page each. Quiz data is an inline `window.GD_QUIZ = {id, rules, ex, q}`
  script, followed by `practice.js` (the shared quiz engine).
- `studio.html`, `make.html`, `play.html` + `studio.js`, `studio-make.js`, `studio-data.js` — the **Practice Studio** (see "Practice Studio").
- `exam-<level>-<n>.html` — one mini exam each (13 pages). See "Mini exams". Engine: `exam.js`.
- `practice.js` — quiz engine: stats, progress bar, exercise chips, answer checking, wrong answers come
  back 4 questions later, progress saved in `localStorage['gd-prac-<id>']`. All its UI text is in its
  own `UI` object (en/ru/uz) and it re-renders when `data-lang` changes, so it does **not** use `TR`.

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
- The Google Fonts `<link>` must stay **non-blocking**: `media="print" onload="this.media='all'"` plus a `<noscript>` copy.
  A normal blocking stylesheet left iPhones on a **white page** whenever fonts.googleapis.com was slow or blocked
  (WebKit waits for it before parsing the body). Never put an external stylesheet or script in `<head>` without `async`/this trick.
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
- Pane 3 ends each `.lg` with an "In plain words" box: `<div class="plain"><h4>...</h4><p>...</p><ul class="ex">
  <li><b>example</b> meaning</li></ul><p>...</p></div>`. Heading text: `In plain words` / `Простыми словами` /
  `Oddiy so'zlar bilan`. Write it for someone who knows no grammar in any language: an everyday picture,
  real examples with their meaning, and no grammar terms. It comes after the normal explanation, never instead.
- Grammar words in pane 3 carry a short meaning once per language block:
  `verb<span class="gl"> (action word)</span>`. Keep formulas (with + or →) and `.x` / `.ok` examples free of these.
- Pane 5 ends with a next-step box, in level-menu order:
  `<div class="prac nxt"><p class="ptx">Next topic</p><a class="chip" href="slug.html">Title</a></div>`.
  The last topic of a level uses `Next level` and links to the next level page; the last C1/C2 topic
  uses `You finished the last topic!` and links `Home`.

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
- **`basic` is the default skin** and the calm one meant for real study: no animation while reading, no
  decoration, one blue accent. Its final overrides are the `/* ===== basic: calm reading theme ===== */`
  block at the end of `style.css`.
- Basic has two modes, set by `<html data-mode="light|dark">`. The header Theme chip opens a roulette wheel (`.thm`, built in `tmOpen` in `app.js`)
  with Light, Dark, Persona 3, Persona 4 and Persona 5. Tap a slice, or drag or flick the wheel by mouse or finger; where it lands under the blade is the new theme. `localStorage['gd-theme']` holds
  `light`, `dark`, `p3`, `p4` or `p5`; with no saved choice, Basic follows the device's light or dark setting.
  Each page's inline head script must apply this before paint, so keep it in sync with `app.js`.
- Skins: `p3`, `p4`, `p5`, `basic` (Persona 3/4/5 + plain). Set via `<html data-skin>`,
  stored in `localStorage['gd-theme']`, cycled by the header chip. Each skin has its own
  variables, motion, page-transition and particle styles in `style.css`.
- `prefers-reduced-motion` is fully honoured — keep it that way for any new animation.
- Fonts: none of the Latin display fonts or Barlow has Cyrillic, so every font stack carries a Cyrillic
  fallback (`Oswald` for P3/P5 headings, `Rubik` for P4, `Golos Text` for body text). Browsers download
  those only for Russian text. Keep the fallbacks when changing a font.

## Language switching
- `data-lang` on `<html>` (`en`/`ru`/`uz`), stored in `localStorage['gd-lang']`,
  `documentElement.lang` kept in sync. Switcher buttons: `data-act="lang" data-l="xx"`.
  The header switcher and the in-lesson `.lgb` switcher are both driven by `app.js`.

## Topic search (client-side)
- A **Search** chip sits in the header `.hctl` (injected by `srButton()` at boot). Shortcuts:
  `Ctrl/⌘+K` or `/` opens it, `Esc` closes, `↑`/`↓` move, `Enter` opens.
- Index format — `window.GD_Search = [{u,t,l,c,k}, …]`:
  `u` page url, `t` title, `l` level, `c` the topic's "We cover:" terms, `k` the full
  3-language preview text.
- **`search-data.js` is generated, never hand-edited.** After adding, renaming or removing a
  topic, regenerate it or the new topic will be invisible to search:
  ```
  node gen-search.js "<absolute path to this folder>"
  ```
  It parses the `.menu` markup of `a1..c1.html`, so the menu entry must exist first.
- `app.js` lazy-loads `search-data.js` on first use, so the file must sit next to the pages.
- Ranking is relevance-based, not level order: word-boundary token match, scored
  title (100) > cover terms (40) > preview (5) > level (3); sorted by how many query terms
  matched, then score, then level. Matching is word-start aware so `any` hits `anything`
  but not `m**any**`.
- UI strings come from the `TR` keys `Search`, `Type to search...`, `No results`.
- Styles are the `/* ===== search ===== */` block at the end of `style.css`
  (`.se`, `.sch`, `.schbox`, `.schin`, `.schres`, `.hl`). Overlay `z-index:9000`.

## Analytics (GoatCounter)
- Every `.html` page carries this snippet, inserted just before `</head>`:
  ```html
  <script data-goatcounter="https://mrgood.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
  ```
- Site code is **mrgood**. Stats are **private** — dashboard: https://mrgood.goatcounter.com
  (owner login only). There is deliberately **no public visitor counter** on the site.
- If the site code ever changes, the snippet must be swapped in **all** html files
  (a simple find/replace of the `data-goatcounter` URL).
- Only visits after the snippet ships are counted; earlier traffic is lost.

## Adding a new topic
1. Copy an existing lesson file and rename it to the topic slug (e.g. `present-simple.html`).
2. Update `<title>`, `<meta>`, the `<h1>`, breadcrumb, and all five panes (with `.lg` x3), including the
   "In plain words" box in pane 3.
3. **Link it** from the correct level page: add an `<li>` to `.menu` on `a1..c1.html`, with
   `.lv > b` (title) + `.lv span` ("Open topic") + a `.tp` preview containing `.tl[data-l]`
   for en/ru/uz.
4. If the level page's topic count changes, update it in **all four** places: the `index.html`
   span, the level page hero, that level page's `<meta name="description">` / `og:description`
   / `twitter:description`, and both `TR` keys in `app.js` (the `· N topics` and the
   `N topics. Choose one.` forms, in en/ru/uz). Then update the inventory list above.
5. **Regenerate the search index** (`node gen-search.js "<project folder>"`) so the new topic
   is findable via the header Search button. Also add the new page's next-step box and repoint the
   box on the topic before it (see "Lesson template").
6. Quick verification: `node --check app.js`; count `class="lv"` links on the level page;
   check every `href="*.html"` resolves to a real file; and confirm `search-data.js` now
   lists the new topic.

## Practice Arena (quizzes)
- Quiz data format: `rules` = `{key:{en,ru,uz}}` (HTML allowed); `ex` = `[{h:{en,ru,uz}, box?}]` (one per
  exercise, numbered automatically); `q` = `[{e, q, a:[accepted answers], alt?, r:rule key, ru, uz, n?}]`.
  `___` in `q` renders as a blank. `ru`/`uz` are translations shown in that language only; `n` is a
  string or `{en,ru,uz}`. Answer checking (`vars`/`right` in `practice.js`) ignores case, punctuation, extra
  spaces and curly apostrophes, and treats short forms and full forms as equal (don't = do not, I'm = I am,
  can't = cannot, won't = will not, 's = is / has, 'd = would / had, 'll = will, and `dont` without the apostrophe).
  Spelling, word order and the verb form must still be exact. `a` may list several accepted answers.
- **15 quizzes** (A1: to-be, present-simple, present-continuous, past-simple, have-has; A2: past-continuous,
  present-perfect, future-simple-will, be-going-to; B1: present-perfect-continuous, past-perfect,
  past-perfect-continuous; B2: future-continuous, future-perfect, future-perfect-continuous), 72-111 questions
  each, 11-12 exercises each (form, spelling, negatives, questions, short answers, time words, contrast with
  a similar tense, find-the-mistake, word order). Each quiz page has a collapsible "How your answers are
  checked" tip (EN/RU/UZ, in `practice.js`) that tells students to write full sentences with punctuation but
  explains that capitals and punctuation are not marked.
- **Results screen:** when every question is mastered, `practice.js` shows a percentage (right on the first
  try), a grade message, a bar per exercise, the hard questions, a **Practise the hard ones again** review
  mode, and **Start all over**. Wrong-answer counts are saved in `localStorage['gd-prac-<id>']` (`w`).
  **Start all over** opens an in-page dialog (`.qmod` / `.qdlg`, focus on the safe button, Esc cancels), not
  `window.confirm`.
- To add a quiz: copy `practice-present-simple.html`, change `<title>`/`<meta>`, hero and the
  `GD_QUIZ` object (new `id`), then add an `<li>` to `.menu` in `practice.html` and update the
  `· N quiz` count on `index.html` plus its `TR` key in `app.js`. Each `.menu` label like `A2 · 80 questions`
  needs its own `TR` key (RU plural: вопрос / вопроса / вопросов).
- Styles: the `/* ===== practice arena ===== */` block at the end of `style.css` (`--okc`/`--badc`
  per skin for right/wrong colours).
- Quizzes are not in the topic search index (gen-search only reads `a1..c1.html`).

## Practice Studio (create your own practices)
- **No server.** Anyone can build a typed-answer quiz or a multiple-choice mini exam on `make.html`; it is saved in that
  browser (`localStorage['gd-my']`, max 60) and played on `play.html?m=<id>`. Export/Import use a `.json` file. An unsaved
  draft is kept in `localStorage['gd-make-draft']`. `studio.html` is the hub: **Teacher's practices** (from `studio-data.js`)
  and **My practices** (this device), with search and type/level filters.
- **Teacher's practices are public** because they are committed: add practice objects to the `window.GD_Teacher` array in
  `studio-data.js`, commit and push. Play link: `play.html?t=<id>`. Ids: only `a-z 0-9 -`, unique. A student's practice is
  never public; they can only send you its exported `.json`, which you can paste into the array (re-id it).
- **Practice object** (top of `studio.js`): `{id,kind:'quiz'|'exam',title,desc,level:'Any|A1|A2|B1|B2|C1/C2',author,rev,at,
  groups:[{h:instruction,tip:rule shown after each answer,items:[...]}]}`. Quiz item `{q,a:[answers],n?,ru?,uz?}`; exam item
  `{q,o:[2-4 options],c:right index,w:[why per option]}`. `clean()` validates and limits everything (200 questions, 20 sections).
- `toEngine()` converts a practice to `GD_QUIZ` / `GD_EXAM` and `play.html` loads `practice.js` / `exam.js`, so answer checking,
  results screen and restart dialog are shared. **User text is HTML-escaped** (`**bold**` is the only markup) because the
  quiz engine prints rules as HTML. Never pass raw user text as a rule. Engine progress key includes `rev`, so editing a
  practice resets its saved progress. `exam.js` honours `Z.nolink` (custom practices have no topic pages to link to).
- **Open public board** (anyone publishes, everyone sees) was considered and left out: it needs a database/API (e.g. a Neon
  Function) plus spam and moderation handling. Nothing was created in Neon. The practice object is already JSON, so a board
  can be added later without changing the editor.

## Mini exams
- One exam per 6 topics, in level-menu order. 1-2 leftover topics join the last exam of that level;
  4 leftover topics get a shorter exam. Two questions per topic. Currently: A1 6/6/7, A2 6/6/4,
  B1 6/6/6, B2 6/8, C1/C2 6/4 topics = 13 exams, 154 questions.
- Questions and options are English only, like drills. The "why" explanations are EN/RU/UZ on purpose,
  so a starter can understand a mistake. Keep A1/A2 questions in very simple English.
- Data is an inline `window.GD_EXAM = {id, level, lvl, topics:{slug:title}, next:{u,t,k}, q}`, followed by
  `exam.js`. `q` = `[{s:topic slug, q:text with ___, o:[3 options], a:right index, w:[[en,ru,uz] per option]}]`.
  `w` has one explanation for every option: why it is right, or why it is wrong.
- A wrong option must be really wrong. If a wrong option is valid English in any context, replace it.
- The engine shuffles questions and options on every try, and saves the best score in
  `localStorage['gd-exam-<id>']`. Its UI text is in its own `UI` object (en/ru/uz), like `practice.js`.
- Links: an `<a class="lv lvx">` item after the last topic on the level page (`class="lv lvx"` keeps it out
  of the search index and topic counts), a `prac nxt exn` box on that last lesson, and the list in
  `practice.html`. The `Topics X–Y · N questions` strings and `Mini exam N` are `TR` keys.
- If a topic moves between groups, update that exam's `topics`, `q` and links, and the `TR` keys.

## Adding a new level
Create `x.html` from an existing level page, add it to `.menu` on `index.html`, and add the
hero/`TR` strings for the new level.

## Work log / status (update when you finish a batch)
- **All work below is pushed and live** on https://thunder1202.github.io/grammar-desk/.
- Version labelling: this folder (`grammar-desk-v7`) is the newest build. Older copies sit
  next to it in `D:\Новая папка`: `grammar-desk-v6.zip`, `grammar-desk-v7-copy.zip`
  (a zip of this folder), and `grammar-desk-v1-unfinished\`.
- Commits this session, oldest → newest:
  - `7194b45` Add 16 grammar topics across A1-C1 and sync counts
  - `e3a208a` Add client-side topic search with relevance ranking
  - `815f1e7` Add GoatCounter analytics to all pages
  - `cac7cf7` Point GoatCounter at the mrgood site code
- Shipped features:
  - **16 new lesson pages**, wired into the level menus; counts reconciled to
    **A1=19, A2=16, B1=18, B2=14, C1=10** (77 topic pages, 83 html files).
  - **Header Search** over all 77 topics, trilingual, with relevance ranking, word-boundary
    matching, match highlighting and keyboard navigation.
  - **GoatCounter analytics** on every page (private dashboard).
  - **Practice Arena**: the old "Big Practice" section, renamed.
  - **13 mini exams** (see "Mini exams"), simpler English in A1/A2 panes 4-5, next-step boxes on all
    lessons, breadcrumb chips, Cyrillic fonts, and the phone header fix.
  - **"In plain words" boxes** on all 77 topics (pane 3), plus short meanings beside grammar words.
  - **Basic is the default theme** (Light and Dark), with a spinnable roulette theme wheel styled per theme,
    a **To be quiz** (77 questions), and a **Start all over** button on quizzes.
  - **Tense quizzes + results screen:** 12 new tense quizzes (see "Practice Arena"), lenient answer
    matching (case, punctuation, short forms), a results screen and a proper restart dialog.
  - **iPhone white-page fix:** Google Fonts no longer blocks rendering (see "Page conventions").
  - **Practice Studio:** create-your-own practices saved on the device, export/import, and a teacher's shelf (`studio-data.js`).
    Local until pushed; the shelf is empty until the teacher's practices are added.
- Open items / known limits:
  - **Mini-game is local only:** `game.js` and `present-simple-game.html` are not committed, and the
    `Practice` box on `present-simple.html` is kept out of commits. The answer matching bug (curly
    apostrophes, trailing dot, short forms) is fixed in `game.js` with the same matcher as `practice.js`; its
    RU/UZ "why" text still needs correcting.
  - Exam questions, RU/UZ exam explanations and RU/UZ plain-words boxes have not had a teacher review yet.
    The same goes for the 12 new tense quizzes (RU/UZ translations of ~960 questions and the rules).
  - Search is literal word matching — no fuzzy/typo tolerance and no synonyms.
  - The GoatCounter **API token does not work** for automated checks (the public
    `?access-token=` value is not an API token), so stats can only be read by logging into
    the dashboard.

## Local preview
Open `index.html` directly, or run `npx --yes serve "."` in this folder and visit the URL.

## Gotchas
- A new `.html` file is unreachable until it is linked from a level page.
- `.ans` `id`s are referenced by `aria-controls` — keep them unique per page.
- The `TR` dictionary is exact-match; typos silently leave English text untranslated.
- Keep `<meta>` tags per page; Pages has no server, so SEO/social relies on them.
