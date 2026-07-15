# Shreya Pathak — Portfolio

A static one-page portfolio built with plain HTML/CSS/JS (no build step, no framework required).

## File structure

```
portfolio/
├── index.html
├── vercel.json
└── assets/
    ├── style.css
    └── script.js
```

## Deploy to Vercel

**Option A — Vercel CLI (fastest)**
```bash
npm install -g vercel
cd portfolio
vercel        # follow the prompts, accept defaults (no build command needed)
vercel --prod # promote to production
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Other** (static site) — leave build command empty, output directory as root.
4. Click **Deploy**.

**Option C — Drag and drop**
1. Go to [vercel.com/new](https://vercel.com/new).
2. Drag the `portfolio` folder onto the page.

## Editing content

All text lives directly in `index.html` — experience, skills, education, and contact details are plain markup, no CMS or data file. Colors, type, and spacing are controlled via CSS variables at the top of `assets/style.css` (`:root { ... }`).

## Update contact info

Search `index.html` for `mailto:`, `tel:`, and the LinkedIn URL to update contact links.
