# Changelog

All notable changes to this project will be documented in this file.

## [2.0.1] - 2025-05-28

### Fixed

- Fixed React 19 compatibility issues
  - Removed direct React dependencies
  - Updated peerDependencies to support React 19
  - Configured rollup to properly externalize React modules

## [2.0.0] - 2025-05-26

### Added

- `opacityDeltaMultiplier` property: New property to control particle opacity fade speed in 'boom' mode
- Added support for custom styling
  - `className`: Support for custom CSS classes
  - `style`: Support for inline CSS styles

### Fixed

- Fixed particle position calculation logic
- Fixed particle size adjustment issues
- Fixed canvas sizing and positioning issues
