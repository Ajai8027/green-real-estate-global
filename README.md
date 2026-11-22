# Green Real Estate Agency Global — responsive landing page

A single static landing page built from the supplied responsive design references. No build step, packages or backend are required.

## Setup

Open `index.html` directly in a browser, or serve the folder locally:

```powershell
cd "Client Side\deliverable"
python -m http.server 8000
```

Then visit <http://localhost:8000>. Keep `assets/` next to the HTML files so the relative paths continue to work in any static host.

## File structure

```
deliverable/
├── index.html                  Header, hero, registration section, footer
├── privacy.html                Form privacy page linked from the helper and footer
├── styles.css                  Tokens, base, layout, components, form states, media queries
├── app.js                      Client-side validation and accessible feedback
├── assets/
│   ├── green-wordmark.svg      Supplied brand wordmark
│   └── hero-home.webp          Supplied compressed WebP hero image (1536x1024)
├── evidence/                   Browser screenshots captured during verification
├── Browser_Compatibility.md    Actual browser, form and validator results
└── COMPLETION_NOTE.txt         Submission details for the reviewer
```

## Behaviour

- Mobile-first CSS with breakpoints at 768px (tablet) and 1024px (desktop); verified at 375, 768, 1024 and 1440px.
- Both header and hero CTAs link to `#register`. The privacy helper and footer link open `privacy.html`, whose return link goes to `index.html#register`.
- The form uses `novalidate` so the four custom messages are used consistently. Name and email are trimmed before checking, the empty select option is not treated as a choice, and consent must be checked. Errors set `aria-invalid`, are associated with their fields, and the first invalid control receives focus. Correcting a field clears its error.
- A successful check announces only: `Validation complete. Your enquiry has not been sent.` Submission is always prevented. No request is sent and no input is stored in local/session storage, logs or third-party services.

## Repository and live URL

_Not published from this workspace._ No GitHub credentials were available, so the repository URL and live HTTPS deployment URL must be filled in after pushing these files and deploying the folder to GitHub Pages, Vercel or equivalent:

- GitHub repository URL: `<pending>`
- Live deployment URL: `<pending>`

Example publish commands (run from this folder after authenticating with GitHub):

```powershell
git init
git add .
git commit -m "Add responsive Green Real Estate landing page"
git branch -M main
git remote add origin https://github.com/<owner>/<repository>.git
git push -u origin main
```

For Vercel, deploy this folder as a static site with no build command and `./` as the output directory; the existing relative asset and privacy links will survive deployment.

## Limitations

- Browser verification was performed in Microsoft Edge only; Google Chrome and Mozilla Firefox were not available in this environment and are recorded as not tested in `Browser_Compatibility.md`.
- The design PNG/SVG references are not part of the page. The page uses only the supplied compressed WebP and SVG wordmark.
- No real account registration, booking, data submission or external service integration is included.
