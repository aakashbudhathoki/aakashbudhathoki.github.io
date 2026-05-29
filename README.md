# Aakash Budhathoki — Personal Portfolio

A dark, modern Jekyll portfolio site hosted on GitHub Pages.

---

## Local Development

### Prerequisites

- **Ruby 3.1+** — [RubyInstaller](https://rubyinstaller.org/) on Windows
- **Bundler** — run `gem install bundler` after Ruby is installed

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/yourusername.github.io
cd yourusername.github.io

# 2. Install dependencies
bundle install

# 3. Start the dev server
bundle exec jekyll serve

# 4. Open http://localhost:4000
```

Live-reload is enabled by default — changes appear instantly in the browser.

---

## Deploy to GitHub Pages

### Step 1 — Create the repository

Create a GitHub repo named exactly **`yourusername.github.io`**
(replace `yourusername` with your actual GitHub username).

### Step 2 — Update `_config.yml`

```yaml
url:             "https://yourusername.github.io"
baseurl:         ""
github_username: yourusername
```

> If deploying to a *project page* (e.g. `github.io/portfolio`), set
> `baseurl: "/portfolio"` instead and create the repo with that name.

### Step 3 — Push your code

```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git branch -M main
git push -u origin main
```

### Step 4 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)` → **Save**

Your site goes live at `https://yourusername.github.io` within ~60 seconds.

---

## Adding Blog Posts

Posts live in `_posts/`. The filename **must** follow this exact format:

```
_posts/YYYY-MM-DD-your-post-title.md
```

### Example — create `_posts/2026-06-20-setting-up-nginx.md`

```markdown
---
layout: post
title: "Setting Up Nginx as a Reverse Proxy"
date: 2026-06-20
author: Aakash Budhathoki
tags: [Linux, Nginx, Networking]
excerpt: "Step-by-step guide to running Nginx in front of a Node.js app."
---

Your post content in **Markdown** goes here.

## Section Heading

Paragraph with `inline code` and **bold text**.

```bash
sudo apt install nginx
```
```

The post automatically appears on the homepage (latest 3) and on `/blog/`.

---

## Adding Projects

Edit **`_data/projects.yml`** and add a new entry:

```yaml
- name: "Your Project Name"
  icon: "🚀"
  description: >
    What the project does and what problem it solves.
  tags: [Tag1, Tag2, Tag3]
  github: "https://github.com/yourusername/repo"   # optional
  demo:   "https://your-live-demo.com"              # optional
```

No HTML edits needed — the card appears automatically.

---

## Adding Certifications

Edit **`_data/certifications.yml`** and add a new entry:

```yaml
- name:   "Certification Title"
  issuer: "Issuing Organization"
  date:   "Month Year"
  icon:   "🏅"
  url:    ""   # optional: link to your credential badge
```

---

## Customisation Reference

| What to change | Where |
|---|---|
| Name / bio / email | `_config.yml` → `author`, then `index.html` hero |
| GitHub / LinkedIn handles | `_config.yml` → `github_username`, `linkedin_username` |
| Skills | `index.html` → `#skills` section |
| Work experience | `index.html` → `#experience` section |
| Education | `index.html` → `#education` section |
| Colour scheme | `assets/css/main.css` → `:root` variables |
| Projects | `_data/projects.yml` |
| Certifications | `_data/certifications.yml` |
| Blog posts | `_posts/YYYY-MM-DD-title.md` |

---

## Folder Structure

```
portfolio/
├── _config.yml              ← Site settings (update before deploying)
├── Gemfile                  ← Ruby dependencies
├── index.html               ← Main single-page site
│
├── _layouts/
│   ├── default.html         ← Base HTML wrapper (nav + footer)
│   └── post.html            ← Layout for individual blog posts
│
├── _includes/
│   ├── head.html            ← <head> meta tags & CSS link
│   ├── nav.html             ← Navigation bar
│   └── footer.html          ← Site footer
│
├── _data/
│   ├── projects.yml         ← Add / edit projects here
│   └── certifications.yml   ← Add / edit certifications here
│
├── _posts/
│   └── 2026-05-29-*.md      ← Blog posts (YYYY-MM-DD-title.md)
│
├── blog/
│   └── index.html           ← Blog listing page (/blog/)
│
└── assets/
    ├── css/main.css         ← All styles (edit :root for colours)
    └── js/main.js           ← Nav scroll + animations
```

---

Built with [Jekyll](https://jekyllrb.com) and hosted on [GitHub Pages](https://pages.github.com).
