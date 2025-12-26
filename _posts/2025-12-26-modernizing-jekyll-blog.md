---
layout: post
title: Modernizing This Jekyll Blog in 2025
date: 2025-12-26 16:04:00
category: jekyll
tags: jekyll github-pages ci-cd
---

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

Jekyll 4.x offers better performance and is actively maintained, but:
- Requires Ruby 3.1+ (local environment has Ruby 2.6)
- GitHub Pages natively only supports Jekyll 3.9.x
- **Solution**: GitHub Actions workflow uses Ruby 3.1, enabling future upgrade path

To upgrade later:
1. Upgrade local Ruby: `brew install ruby` or use `rbenv`
2. Update Gemfile: `gem "jekyll", "~> 4.3"`
3. Run `bundle update jekyll`

## Benefits

✅ **Faster deployments** - Automated via GitHub Actions  
✅ **Better security** - Dependabot keeps dependencies updated  
✅ **Cleaner config** - Removed 20+ lines of deprecated settings  
✅ **Better SEO** - Added sitemap generation  
✅ **Modern stack** - Up-to-date syntax highlighting and markdown parsing

## Build Performance

Before: Manual builds, no CI  
After: **0.375 seconds** per build ⚡️

## Repository Stats

- **Files changed**: 3 (.gitignore, Gemfile, _config.yml)
- **New files**: 2 (.github/workflows/jekyll.yml, .github/dependabot.yml)
- **Lines removed**: 21 (mostly deprecated config)
- **Lines added**: 19 (mostly documentation and new features)

## Lessons Learned

1. **Version pinning matters** - Explicit Jekyll version prevents unexpected breaks
2. **GitHub Actions > Native builds** - More flexibility, newer Ruby versions
3. **Clean configs age better** - Remove what you don't need
4. **Ruby versions matter** - Jekyll 4.x needs modern Ruby

## Next Steps

- Consider upgrading Ruby locally for Jekyll 4.x
- Add more SEO optimizations (Open Graph, Twitter cards)
- Explore GitHub Actions caching for even faster builds

---

*This blog hasn't had a tech update since 2023. Time flies when you're... not blogging regularly! 😅*
