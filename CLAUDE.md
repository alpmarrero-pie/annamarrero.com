# Notes for Claude Code

Static portfolio site for Anna Marrero (experience designer). Plain HTML/CSS/JS, deployed on Vercel from `main`. No build step: edit files directly.

## How it's built

- One `.html` file per page at the repo root. Styles live in each page's `<head>` `<style>` block plus inline `style="…"` attributes (the site was exported from a design canvas, so most styling is inline).
- Shared header, footer and type styles are duplicated in every page. When changing the header, footer, nav links or footer links, change ALL pages.
- Images and videos are in `images/` and referenced with root paths (`/images/…`).
- Internal links use clean URLs: `/work`, `/about`, `/trusted-contact` (see README for the full list).

## Design tokens

- Background (Snow) `#FDFDFC`; ink `#0F2233`; body text `#3D4A57`; muted `#4E6578`; panel `#E3E8EB`
- Fonts (Google Fonts): Newsreader (display serif), Manrope (body), IBM Plex Mono (labels, nav)
- Header: Work and About links only. Footer: Email, X, LinkedIn, Are.na, © line.
- Footer is pinned to the bottom of each page (`main` is a full-height flex column, footer has `margin-top: auto`). The last section before the footer ends with `clamp(72px, 11.5vw, 166px)` of bottom padding so the gap above the footer is consistent.

## Responsive

- `css/responsive.css` holds shared small-screen rules and loads after each page's own styles. Put new cross-page responsive fixes there.
- Type above ~20px uses fluid `clamp()` sizes; keep body text at 16px and labels at 12px minimum.
- Page-specific breakpoints (820px, 720px, 600px, 520px) live in each page's `<style>` block.

## Behaviour

- `js/work.js`: Work slideshow. Edit the `PROJECTS` array to add/reorder case studies.
- `js/lightbox.js`: any `<button class="cs-zoom">` wrapping an `<img>` opens the image viewer. Needs the `#lb` dialog markup at the bottom of the page.
- `js/section-index.js`: EltaAI sticky section menu (`.el-idx a[data-sec]`).
- `js/ripple.js`: homepage intro.

## Working style

- Anna is a designer, not an engineer: explain changes in plain language and keep edits small.
- Check both desktop (1440px) and phone (390px) widths after layout changes.
- Keep text contrast at 4.5:1 or better and touch targets at 44px or larger.
- Preview locally with `npx serve .`. Commit with a clear message and push to `main` to deploy.
