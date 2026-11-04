# annamarrero.com

Anna Marrero's portfolio. Plain HTML, CSS and JavaScript — no build step, no framework.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` (homepage, ripple intro) |
| `/work` | `work.html` (3D slideshow of case studies) |
| `/about` | `about.html` |
| `/analysis-agent` | `analysis-agent.html` |
| `/eltaai` | `eltaai.html` |
| `/continuing-community` | `continuing-community.html` |
| `/trusted-contact` | `trusted-contact.html` |
| `/loss-of-a-loved-one` | `loss-of-a-loved-one.html` |
| `/business-services` | `business-services.html` |

Clean URLs (no `.html`) come from `vercel.json`.

## Folders

- `images/` — all images and videos
- `js/ripple.js` — homepage intro animation
- `js/work.js` — Work slideshow; the project list (titles, images, order, colours) is at the top
- `js/lightbox.js` — click-to-expand images on case studies (any `button.cs-zoom` with an `<img>` inside)
- `js/section-index.js` — sticky section menu on EltaAI

## Preview locally

```
npx serve .
```

Then open http://localhost:3000.

## Deploy

Hosted on Vercel, connected to this GitHub repo. Every push to `main` goes live automatically.
