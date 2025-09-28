# Contributing to jQuery Tokeninput

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/eutychus/jquery-tokeninput.git
   cd jquery-tokeninput
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

## Build Process

The project uses Grunt for building and linting:

### Available Scripts

- `npm run build` - Build the minified version (includes linting with warnings allowed)
- `npm run lint` - Run strict linting (will fail on warnings)  
- `npm run lint:ci` - Run linting for CI (warnings allowed, for informational purposes)
- `npm test` - Run the build process (same as build)

### Manual Grunt Commands

You can also run Grunt tasks directly:

```bash
npx grunt build    # Build with CI-friendly linting
npx grunt lint     # Strict linting
npx grunt          # Default task (same as build)
```

## Continuous Integration

This project uses GitHub Actions for automated building and testing:

- **Triggers**: Runs on pushes and pull requests to the `master` branch
- **Node.js versions**: Tests on 16.x, 18.x, and 20.x
- **Process**: 
  1. Install dependencies using `npm ci` for reproducible builds
  2. Run linting (informational, won't fail build)
  3. Build the minified version
  4. Verify build artifacts exist
  5. Upload build artifacts for download

### CI Status

[![CI](https://github.com/eutychus/jquery-tokeninput/actions/workflows/ci.yml/badge.svg)](https://github.com/eutychus/jquery-tokeninput/actions/workflows/ci.yml)

## File Structure

- `src/jquery.tokeninput.js` - Source code
- `build/jquery.tokeninput.min.js` - Built minified version
- `package.json` - Dependencies and npm scripts
- `package-lock.json` - Locked dependency versions for reproducible builds
- `Gruntfile.js` - Build configuration
- `.github/workflows/ci.yml` - GitHub Actions CI configuration

## Code Quality

The project uses JSHint for code linting. While the CI build will succeed with warnings (to maintain compatibility with the existing codebase), contributors are encouraged to fix linting issues when possible.

Common linting issues in the current codebase:
- Mixed spaces and tabs
- Missing semicolons
- Use of `==` instead of `===`
- Functions used before they're defined
- Missing braces for single-statement blocks

## Pull Requests

When submitting a pull request:

1. Ensure your changes don't break the build
2. Test your changes locally using `npm run build`
3. Consider fixing any linting warnings in code you're modifying
4. The CI system will automatically build and test your changes

## Dependencies

The project uses these main development dependencies:

- **Grunt**: Task runner for building and linting
- **grunt-contrib-uglify**: JavaScript minification
- **grunt-contrib-jshint**: Code linting
- **grunt-cli**: Command line interface for Grunt

All dependencies are locked using `package-lock.json` to ensure reproducible builds across different environments.