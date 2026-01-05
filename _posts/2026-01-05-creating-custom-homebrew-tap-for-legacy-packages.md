---
layout: post
title: Creating a Custom Homebrew Tap for Legacy Packages
date: 2026-01-05 07:10:00
category: homebrew
tags: homebrew macos package-management ai-generated
---

> **⚠️ AI-GENERATED CONTENT**  
> This post was created entirely by AI (GitHub Copilot) based on a user request. While technically reviewed, it may contain inaccuracies or outdated information. Use at your own discretion.

When Homebrew Core drops support for older versions of packages, you're left with few options: upgrade your workflow, build from source manually, or maintain your own tap. This guide shows how to create a custom Homebrew tap for legacy packages.

## Why Custom Taps?

Homebrew Core has strict policies about version support:

- Only the latest stable versions are maintained
- Deprecated versions are removed periodically
- Security updates may force breaking changes

Sometimes you need older versions for:

- Legacy project compatibility
- Stable production environments
- Testing against specific versions
- Avoiding breaking changes in dependencies

## Example: homebrew-legacy

I created [hokix/homebrew-legacy](https://github.com/hokix/homebrew-legacy) to maintain older package versions no longer in homebrew-core. This serves as a reference implementation.

## Creating Your Own Tap

### 1. Repository Structure

Create a repository named `homebrew-<tap-name>`:

```bash
# Example: homebrew-legacy
mkdir homebrew-legacy
cd homebrew-legacy
git init
```

Homebrew expects a specific structure:

```
homebrew-legacy/
├── Formula/          # Main formula directory
│   ├── package1.rb
│   └── package2.rb
├── Casks/           # Optional: for GUI apps
├── README.md
└── .github/
    └── workflows/   # Optional: CI/CD for testing
```

### 2. Writing a Formula

Formulae are Ruby files that describe how to install packages. Here's a template:

```ruby
class PackageName < Formula
  desc "Brief description of the package"
  homepage "https://example.com"
  url "https://example.com/releases/package-1.2.3.tar.gz"
  sha256 "abc123..." # SHA-256 checksum of the tarball
  license "MIT"

  # Dependencies
  depends_on "cmake" => :build  # Build-time dependency
  depends_on "openssl@1.1"      # Runtime dependency

  def install
    # Build and installation commands
    system "./configure", "--prefix=#{prefix}"
    system "make"
    system "make", "install"
  end

  test do
    # Test that the package works
    system "#{bin}/package", "--version"
  end
end
```

### 3. Getting Formula Info from Homebrew History

For packages removed from homebrew-core, retrieve the last working formula:

```bash
# Clone homebrew-core
git clone https://github.com/Homebrew/homebrew-core.git
cd homebrew-core

# Find the last commit for the formula
git log --all --full-history -- Formula/package.rb

# View the formula at that commit
git show <commit-hash>:Formula/package.rb > ../homebrew-legacy/Formula/package.rb
```

### 4. Computing SHA256 Checksums

```bash
# Download the source tarball
curl -LO https://example.com/package-1.2.3.tar.gz

# Compute SHA256
shasum -a 256 package-1.2.3.tar.gz
```

### 5. Testing Your Formula

```bash
# Install from local repository (for testing)
brew install --build-from-source ./Formula/package.rb

# Audit for common issues
brew audit --strict --online ./Formula/package.rb

# Run tests
brew test ./Formula/package.rb

# Uninstall after testing
brew uninstall package
```

### 6. Publishing Your Tap

```bash
# Add, commit, and push to GitHub
git add Formula/
git commit -m "Add legacy package formula"
git push origin main
```

## Using Your Custom Tap

### Adding the Tap

```bash
# Add your tap
brew tap hokix/legacy https://github.com/hokix/homebrew-legacy.git

# Or use the shorthand (GitHub only)
brew tap hokix/legacy
```

### Installing Packages

```bash
# Install from your tap
brew install hokix/legacy/package

# List all taps
brew tap

# Remove a tap
brew untap hokix/legacy
```

### Updating Tap Formulae

```bash
# Update all taps (including yours)
brew update

# Upgrade packages from your tap
brew upgrade hokix/legacy/package
```

## Best Practices

### 1. Version Pinning

Pin specific versions in formula names for clarity:

```ruby
# Instead of: Formula/python.rb
# Use: Formula/python@3.8.rb
class PythonAT38 < Formula
  desc "Python 3.8 (legacy version)"
  # ...
end
```

### 2. Deprecation Notices

Add warnings for truly outdated packages:

```ruby
def install
  opoo "This is a legacy version. Consider upgrading to the latest."
  # ... installation steps
end
```

### 3. Documentation

Maintain a clear README:

```markdown
# homebrew-legacy

Legacy package versions no longer supported by homebrew-core.

## Available Packages

- `package@1.0` - Last 1.x version before 2.0 rewrite
- `old-tool` - Removed from homebrew-core in 2024

## Installation

brew tap hokix/legacy
brew install hokix/legacy/package@1.0

## Warning

These packages are unmaintained. Use at your own risk.
```

### 4. CI/CD Testing

Add GitHub Actions to test formulae automatically:

```yaml
# .github/workflows/test.yml
name: Test Formulae
on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - name: Test formulae
        run: |
          brew test-bot --tap=$GITHUB_REPOSITORY
```

## Common Pitfalls

### 1. Bottle Support

Pre-built binaries (bottles) require significant infrastructure. For personal taps, build from source:

```ruby
# Disable bottling
bottle :unneeded
```

### 2. Conflicting Formulae

Avoid conflicts with homebrew-core:

```bash
# Use versioned names
Formula/python@3.8.rb  # Good
Formula/python.rb      # Bad - conflicts with core
```

### 3. Dependency Hell

Legacy packages may depend on deprecated libraries:

```ruby
# Pin to specific dependency versions
depends_on "openssl@1.1"  # Not just "openssl"
```

### 4. Build Failures on New macOS

Old packages may not build on newer macOS versions. Document compatibility:

```ruby
desc "Legacy package (tested on macOS 12-13)"
# Consider patches if needed
patch :DATA if MacOS.version >= :sonoma
```

## Alternatives to Custom Taps

Before creating a tap, consider:

1. **Docker**: Containerize legacy environments
2. **Homebrew Versions**: Some older versions available in `homebrew/cask-versions`
3. **Manual builds**: For one-off needs, build manually
4. **Package from source**: Use `./configure && make install`

## Real-World Example: hokix/homebrew-legacy

My tap maintains:

- Legacy development tools no longer in core
- Specific versions for production compatibility
- Tools removed due to deprecation

Usage:

```bash
brew tap hokix/legacy
brew install hokix/legacy/<package>
```

Check the [repository](https://github.com/hokix/homebrew-legacy) for available packages.

## Maintenance Considerations

Custom taps require ongoing work:

- **Security updates**: Monitor CVEs for your packages
- **macOS compatibility**: Test on new macOS releases
- **Dependency updates**: Keep dependencies current
- **Documentation**: Update README when adding/removing formulae

## Conclusion

Custom Homebrew taps give you control over package versions when homebrew-core moves on. While it adds maintenance burden, it's invaluable for:

- Maintaining legacy environments
- Avoiding forced upgrades
- Preserving working toolchains
- Supporting older projects

Start small, document well, and only maintain what you actually need. Your future self (and colleagues) will thank you.

## Resources

- [Homebrew Tap Documentation](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap)
- [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
- [hokix/homebrew-legacy](https://github.com/hokix/homebrew-legacy)
- [Homebrew Core Repository](https://github.com/Homebrew/homebrew-core)

---

_Have questions or found this useful? Let me know via GitHub issues!_
