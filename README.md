# Xiao Hui's Blog

> _"I'm going to succeed because I'm crazy enough to think I can."_

A personal technical blog powered by Jekyll and GitHub Pages, featuring articles on Python, Linux, shell scripting, and software development.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://hokix.github.io)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.4.1-red)](https://jekyllrb.com/)
[![Deploy Status](https://github.com/hokix/hokix.github.io/actions/workflows/jekyll.yml/badge.svg)](https://github.com/hokix/hokix.github.io/actions/workflows/jekyll.yml)

## 🌐 Visit

**Live Site**: [hokix.github.io](https://hokix.github.io)

## 📝 About

This blog contains technical articles covering:

- Python programming (map/reduce, datetime, context managers, itertools)
- Linux and shell scripting
- Build tools and cross-compilation (FFmpeg, Google CPU Profiler)
- GitHub Pages and Jekyll setup

## 🚀 Tech Stack

- **Static Site Generator**: Jekyll 4.4.1
- **Theme**: [jekyll-theme-cayman](https://github.com/pages-themes/cayman)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions (automated deployment)
- **Syntax Highlighting**: Rouge
- **Markdown**: Kramdown with GFM parser

## 🛠️ Local Development

### Prerequisites

- Ruby 3.1+ (Ruby 3.4+ recommended)
- Bundler

### Setup

```bash
# Clone the repository
git clone https://github.com/hokix/hokix.github.io.git
cd hokix.github.io

# Install dependencies
bundle install --path vendor/bundle

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Create a New Post

```bash
# Create a new file in _posts/ with the format:
# YYYY-MM-DD-title-with-dashes.md

cat > _posts/$(date +%Y-%m-%d)-my-new-post.md << 'EOF'
---
layout: post
title: My New Post Title
date: $(date +%Y-%m-%d\ %H:%M:%S)
category: category-name
tags: tag1 tag2
---

Your content here...
EOF
```

## 📂 Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _includes/           # Reusable components
├── _layouts/            # Page layouts
├── _posts/              # Blog posts (Markdown)
├── _sass/               # Sass stylesheets
├── css/                 # Compiled CSS
├── images/              # Image assets
├── .github/
│   ├── workflows/       # GitHub Actions CI/CD
│   └── dependabot.yml   # Dependency updates config
├── Gemfile              # Ruby dependencies
└── index.html           # Homepage
```

## 🔄 Deployment

This blog uses **GitHub Actions** for automatic deployment:

1. Push to `master` branch
2. GitHub Actions builds the site with Jekyll
3. Deploys to GitHub Pages automatically

**Manual deployment** is no longer needed!

## 🔧 Configuration

Key settings in `_config.yml`:

- **Timezone**: Asia/Shanghai
- **Permalink**: `/:year/:month/:day/:title/`
- **Plugins**: jekyll-sitemap (for SEO)
- **Highlighter**: rouge

## 📦 Dependencies

Managed via Bundler. Key gems:

- `jekyll` (~> 4.4.1) - Static site generator
- `jekyll-sitemap` - Automatic sitemap generation
- `rouge` - Syntax highlighting
- `kramdown-parser-gfm` - GitHub Flavored Markdown
- `jekyll-theme-cayman` - Theme

Auto-updated weekly via Dependabot.

## 🔐 Security

- Dependabot enabled for automatic security updates
- Vendor dependencies excluded from version control
- No secrets or credentials in repository

## 📜 License

Content is © Xiao Hui. Code/configuration is available for reference.

## 📬 Contact

- **Email**: hokix@live.com
- **GitHub**: [@hokix](https://github.com/hokix)
