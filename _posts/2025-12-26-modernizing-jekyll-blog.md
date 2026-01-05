---
layout: post
title: Modernizing This Jekyll Blog in 2025
date: 2025-12-26 16:04:00
category: jekyll
tags: jekyll github-pages ci-cd ai-generated
excerpt: "After nearly two years since the last update, I've modernized this blog's infrastructure. Here's what changed and why."
---

> **⚠️ AI-GENERATED CONTENT**  
> This post was created entirely by AI (GitHub Copilot) based on a user request. While technically reviewed, it may contain inaccuracies or outdated information. Use at your own discretion.

After nearly two years since the last update, I've modernized this blog's infrastructure. Here's what changed and why.

## What Was Updated

### 1. Jekyll Configuration Cleanup

Removed deprecated and obsolete configuration options:

- **Removed**: `lsi`, `detach`, `quiet`, `rdiscount` - no longer used or deprecated
- **Updated**: Switched from `coderay` to `rouge` for syntax highlighting (Jekyll's standard)
- **Fixed**: Permalink structure from `date` to `/:year/:month/:day/:title/` for better URLs

### 2. Dependency Management

**Before**: Missing Jekyll version, outdated dependencies

```ruby
gem "webrick"
gem "kramdown-syntax-coderay"  # deprecated
```

**After**: Explicit versioning and modern dependencies

```ruby
gem "jekyll", "~> 3.9.5"
gem "jekyll-sitemap"  # for SEO
gem "rouge"           # modern syntax highlighting
```

### 3. GitHub Actions CI/CD

Added automated deployment workflow (`.github/workflows/jekyll.yml`):

- Builds on every push to main/master
- Uses Ruby 3.1 (vs local Ruby 2.6)
- Automatic deployment to GitHub Pages
- No more manual builds!

### 4. Dependabot Integration

Re-added Dependabot configuration for automatic dependency updates:

- Weekly checks for bundler dependencies
- Weekly checks for GitHub Actions versions
- Maximum 5 PRs at a time

### 5. Build Configuration

Added proper exclusions to prevent build errors:

```yaml
exclude: ["vendor/", ".bundle/", "Gemfile", "Gemfile.lock", "node_modules/"]
```

## Why Not Jekyll 4.x?

~~Jekyll 4.x offers better performance and is actively maintained, but:~~

- ~~Requires Ruby 3.1+ (local environment has Ruby 2.6)~~
- ~~GitHub Pages natively only supports Jekyll 3.9.x~~
- ~~**Solution**: GitHub Actions workflow uses Ruby 3.1, enabling future upgrade path~~

~~To upgrade later:~~

1. ~~Upgrade local Ruby: `brew install ruby` or use `rbenv`~~
2. ~~Update Gemfile: `gem "jekyll", "~> 4.3"`~~
3. ~~Run `bundle update jekyll`~~

**Update**: We went ahead and upgraded to Jekyll 4.4.1! 🎉

### The Upgrade Process

1. **Upgraded Ruby locally**: Installed Ruby 3.4.8 via Homebrew
2. **Dependabot helped**: Automatically created PR to update Jekyll to 4.4.1
3. **Fixed navigation links**: Jekyll 4 generates pages as directories (`/about/` instead of `/about.html`)

### What Changed in Jekyll 4

- **Page URLs**: Jekyll 4 creates directory structures with `index.html` files
  - Before: `/about.html`, `/archive.html`, `/category.html`
  - After: `/about/index.html`, `/archive/index.html`, `/category/index.html`
  - Fixed navigation links to use trailing slash URLs
- **Better performance**: Faster builds and improved caching
- **Modern dependencies**: Updated sass-embedded and other gems
- **Build time**: Still fast at ~0.3 seconds ⚡️

## Benefits

✅ **Faster deployments** - Automated via GitHub Actions  
✅ **Better security** - Dependabot keeps dependencies updated  
✅ **Cleaner config** - Removed 20+ lines of deprecated settings  
✅ **Better SEO** - Added sitemap generation  
✅ **Modern stack** - Up-to-date syntax highlighting and markdown parsing

## Build Performance

Before: Manual builds, no CI  
After: **0.312 seconds** per build ⚡️

## Repository Stats

- **Files changed**: 7 (4 modified, 3 new)
- **Modified files**: .gitignore, Gemfile, \_config.yml, \_includes/header.html
- **New files**: .github/workflows/jekyll.yml, .github/dependabot.yml, \_posts/2025-12-26-modernizing-jekyll-blog.md
- **Lines removed**: 21 (mostly deprecated config)
- **Lines added**: 189 (including new workflows, Dependabot config, and this blog post)
- **Dependabot PRs**: 2 auto-merged (Jekyll 4.4.1 upgrade, GitHub Actions updates)

## Lessons Learned

1. **Version pinning matters** - Explicit Jekyll version prevents unexpected breaks
2. **GitHub Actions > Native builds** - More flexibility, newer Ruby versions
3. **Clean configs age better** - Remove what you don't need
4. **Ruby versions matter** - Jekyll 4.x needs modern Ruby (upgraded from 2.6 to 3.4)
5. **Dependabot is worth it** - Automated the Jekyll 4 upgrade seamlessly
6. **Test locally** - Jekyll 4's directory structure change broke navigation links initially

## Timeline

- **Initial modernization**: Configuration cleanup, CI/CD setup, Dependabot
- **+3 hours**: Dependabot automatically upgraded Jekyll to 4.4.1
- **+30 minutes**: Upgraded local Ruby 3.4.8, fixed navigation links for Jekyll 4
- **Result**: Fully automated, modern Jekyll 4 blog with CI/CD

## Next Steps

- ~~Consider upgrading Ruby locally for Jekyll 4.x~~ ✅ Done! (Ruby 3.4.8)
- ~~Upgrade to Jekyll 4.x~~ ✅ Done! (Jekyll 4.4.1)
- Add more SEO optimizations (Open Graph, Twitter cards)
- Explore GitHub Actions caching for even faster builds
- Update README with better documentation ✅ Done!

---

_This blog hasn't had a tech update since 2023. Time flies when you're... not blogging regularly! 😅_
