# Browser Compatibility and Verification Record

Job ID: `iz81MJtSieKOyhtxSKlu`
Tested date: **22 November 2026**
Page under test: the completed `index.html` / `privacy.html` in this folder, served locally with `python -m http.server 8000` at `http://127.0.0.1:8000`.

All results below are **observed** results from runs performed on that date. Nothing is prefilled from expectations.

## 1. Test setup

| Item | Actual value |
|---|---|
| Operating system | Microsoft Windows 11 Home Single Language, version 10.0.26300, 64-bit |
| Browser actually run | **Microsoft Edge 157.0.4341.60** (Chromium engine) |
| Browser executable | `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` |
| Automation | `playwright-core` driving the installed Edge, headless, device scale factor 1 |
| Local server | Python 3.12.10 `http.server` on 127.0.0.1:8000 |
| Viewport heights used | 812px at 375px width; 1024px at 768, 1024 and 1440px widths |

**Google Chrome and Mozilla Firefox were NOT run.** Neither is installed in this environment. They are recorded as not tested, not as passed. See section 10.

## 2. Viewport layout checks (T01, T02, T03)

| Viewport | Page overflow | Key measured positions (CSS px, from document top) | Result | Evidence |
|---|---|---|---|---|
| 375 × 812 | `scrollWidth 375 = innerWidth 375` | Hero CTA y330; hero image 343×229 at y414; intro heading y690; form card 343×537 at y878, padding 20; footer y1492 | No overflow, stacking and wrapping correct | `evidence/edge-375.png` |
| 768 × 1024 | `scrollWidth 768 = innerWidth 768` | Hero H1 two lines (108px tall); hero CTA y384; hero image 704×469 at y464; header CTA 126×48 at x610 ("Register"); form card 704×538 at y1116 | No overflow, stacked layout correct | `evidence/edge-768.png` |
| 1024 × 1024 (intermediate) | `scrollWidth 1024 = innerWidth 1024` | Hero image 560×373 at x424, y131; form card 620×538 at x364, y584 | No overflow, no overlap or clipped controls | `evidence/edge-1024.png` |
| 1440 × 1024 | `scrollWidth 1440 = innerWidth 1440` | Container content x120–1320 (1200px); header CTA 198×48 at x1122; hero image 560×373 at x760, y131; hero CTA y404; intro y626; form card 620×538 at x700, y580; footer y1172 | No overflow, two-column layout correct | `evidence/edge-1440.png` |

## 3. Comparison with the reference PNG/SVG files (T04)

Measured DOM geometry was compared with the coordinates in the editable SVG references. At 375px the hero CTA (330), hero image (414), card (878) and footer (1492) match the reference positions exactly; at 1440px the card (580), intro (626), hero CTA (404), hero image (x760, y131) and footer (1172) match within 3px. At 768px the hero image (464), hero CTA (384), card (1116) and header CTA (x610, 126×48) match exactly.

Computed styles confirmed: canvas `rgb(248,246,240)`, heading colour `rgb(23,60,48)`, Arial, and H1 34/42 (mobile), 44/54 (tablet), 52/64 (desktop), weight 700; card padding 20px mobile / 32px tablet and desktop, radius 16px, 1px border. The WebP rendered at 3:2 with rounded corners and no distortion.

Deliberate deviation: the supplied wordmark is 350×64, so at 375px it is displayed at 205px wide × approximately 37.5px high to preserve its aspect ratio, as the specification requires. The mobile SVG reference stretches it to 205×55; preserving the ratio was prioritised over that stretched reference measurement. The SVG reference also renders the copyright line as `Ac 2026…` (an encoding artefact); the page uses `© 2026 Green Real Estate Agency Global.` from the copy specification.

## 4. Link checks (T05)

| Check | Observed result | Pass |
|---|---|---|
| Header CTA `href` | `#register`; clicking produced `http://127.0.0.1:8000/index.html#register` | Yes |
| Hero CTA `href` | `#register` | Yes |
| Form privacy helper `href` | `privacy.html` | Yes |
| Footer privacy `href` | `privacy.html` | Yes |
| Privacy page loaded | Title `Form privacy information \| Green Real Estate Agency Global` | Yes |
| Privacy return link | Clicking produced `http://127.0.0.1:8000/index.html#register` | Yes |

## 5. Form test cases (T06)

All six cases from `Form_Test_Cases.json` were run in Edge at 1440px by filling the form and clicking **Check my details**. After every case the URL remained `http://127.0.0.1:8000/index.html` (no navigation) and both `localStorage` and `sessionStorage` contained 0 keys.

| Case | Expected | Observed | `aria-invalid` / focus | Evidence |
|---|---|---|---|---|
| F01 | Validation complete. Your enquiry has not been sent. | Status region showed exactly that text; no field errors | none / no forced focus | `evidence/form-success.png` |
| F02 | Enter your full name. | Error text under Full name: `Enter your full name.` | `full-name`, focus moved to `full-name` | `evidence/form-error-name.png` |
| F03 | Enter a valid email address. | Error text under Email address: `Enter a valid email address.` | `email`, focus moved to `email` | — |
| F04 | Choose a home type. | Error text under Preferred home type: `Choose a home type.` | `home-type`, focus moved to `home-type` | — |
| F05 | Please confirm that you agree to be contacted. | Consent error: `Please confirm that you agree to be contacted.` | `consent`, focus moved to `consent` | `evidence/form-error-consent.png` |
| F06 | Validation complete. Your enquiry has not been sent. | Leading/trailing spaces in the name were trimmed by the check; status showed exactly the expected text | none / no forced focus | — |

Additional observed behaviour: after submitting empty, the Full name error read `Enter your full name.`; typing `Taylor Morgan` cleared it to an empty string. No network request is made by `app.js` on submit.

## 6. Keyboard, semantics and accessibility (T07, T08)

Tab order observed in Edge: skip link → wordmark link → header CTA → hero CTA → Full name → Email address → Preferred home type → consent checkbox → submit button. Every focused element reported `outline-style: solid` and `outline-width: 3px`, so keyboard focus is visible. Evidence: `evidence/keyboard-focus.png`.

DOM inspection found exactly 1 `<header>`, 1 `<main>`, 2 `<section>` elements and 1 `<footer>`; one H1 (`A clearer path to your next home.`) followed by two H2 headings (`Start with what matters to you.`, `Register your interest`). All four form controls have an associated `<label for>` and `aria-describedby` pointing at their error paragraph. Both images have alt text: the wordmark `Green Real Estate Agency Global`, the hero `Contemporary white home with a landscaped front garden`; both loaded (`naturalWidth` 350 and 1536 respectively). Document language is `en`.

Error paragraphs use `aria-live="polite"` and are associated with their fields; the success message uses a `role="status"` / `aria-live="polite"` region. Focus moved to the first invalid control in each invalid case (section 5).

## 7. Console and assets (T09)

Console was captured on every viewport run: **0 console errors** at 375, 768, 1024 and 1440px after the final fix (an initial `favicon.ico` 404 at 375px was fixed by adding an explicit SVG icon link, then re-tested). Failed/4xx asset requests: **0** in the final run. The hero is the supplied WebP (`assets/hero-home.webp`, 362,970 bytes); the page does not load or depend on any design PNG/SVG reference as a screenshot.

## 8. HTML validation (T10)

Final `index.html` and `privacy.html` were submitted by POST to the Nu HTML Checker JSON endpoint at `https://validator.w3.org/nu/?out=json` on 22 November 2026.

| File | HTTP status | Errors | Warnings |
|---|---|---|---|
| `index.html` | 200 | 0 | 0 |
| `privacy.html` | 200 | 0 | 0 |

The checker returned an empty `messages` array for both files. No remaining warnings to explain.

## 9. Deployed-site retest (T11)

Repository: https://github.com/Ajai8027/green-real-estate-global (public)
Live URL: https://green-real-estate-global.vercel.app

The live URL was reopened in Edge 157.0.4341.60 on 22 November 2026 and retested:

| Check | Observed result |
|---|---|
| 375px and 1440px layout | `scrollWidth = innerWidth` at both widths; no overflow; both images loaded (`naturalWidth` 1536 hero, 350 wordmark). Evidence: `evidence/live-edge-375.png`, `evidence/live-edge-1440.png` |
| Static asset paths on deployment | `index.html`, `styles.css`, `app.js`, `privacy.html` and both `assets/` files all returned HTTP 200 from the live host |
| Header CTA | Reached `https://green-real-estate-global.vercel.app/index.html#register` |
| Form privacy helper and footer link | Both reached `/privacy.html`; the return link reached `/index.html#register` |
| Form cases F01–F06 | All six produced the same observed messages as locally; no case navigated away from the page |
| Console and network | 0 console errors, 0 failed requests on the live site |

## 10. Unresolved issues and limitations

1. Google Chrome and Mozilla Firefox were not available and were not tested. Only Microsoft Edge 157.0.4341.60 was exercised, so cross-browser claims beyond Chromium cannot be made.
2. No Google Drive folder was created or shared; `COMPLETION_NOTE.txt` is supplied in the repository instead.
3. Form validation is a local check only; no enquiry is sent or stored, as specified.

## 11. Evidence index

| File | Contents |
|---|---|
| `evidence/edge-375.png` | Full page at 375 × 812 |
| `evidence/edge-768.png` | Full page at 768 × 1024 |
| `evidence/edge-1024.png` | Full page at 1024 × 1024 (intermediate width) |
| `evidence/edge-1440.png` | Full page at 1440 × 1024 |
| `evidence/form-error-name.png` | F02 error state with focus on Full name |
| `evidence/form-error-consent.png` | F05 consent error state |
| `evidence/form-success.png` | F01 success announcement |
| `evidence/keyboard-focus.png` | Keyboard focus on a control after tabbing |
| `evidence/live-edge-375.png` | Live deployment at 375 × 900 |
| `evidence/live-edge-1440.png` | Live deployment at 1440 × 900 |
