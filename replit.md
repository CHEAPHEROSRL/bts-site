# Agency Site

## Overview

This is a Next.js agency website that uses Directus as a headless CMS for content management. The site fetches page content and dynamic blocks from a Directus backend, allowing for flexible content composition through a block-based page builder approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 16** with Pages Router architecture
- **React 19** for UI components
- Static site generation (SSG) with `getStaticProps` and incremental static regeneration (ISR) using `revalidate: 60`

### Content Management Pattern
The site uses a block-based content system:
- Pages are fetched from Directus and contain arrays of block IDs
- Each block references a collection type (e.g., `block_gallery`, `block_logocloud`) and an item ID
- Block content is fetched dynamically and can include nested items
- Blocks can be hidden via a `hide_block` flag

### Page Structure
- `pages/_app.js` - Global layout wrapper with Footer component
- `pages/_document.js` - Custom HTML document structure
- `pages/index.js` - Home page with Directus data fetching
- `pages/api/` - API routes directory (includes example endpoint)

### Styling Approach
- Global CSS in `styles/globals.css` with CSS custom properties
- CSS Modules for component-specific styles (`Home.module.css`)
- Inline styles used in some components (Footer)

### Path Aliases
- `@/*` maps to the project root for cleaner imports

## External Dependencies

### Directus CMS
- **Purpose**: Headless CMS for all page and block content
- **Configuration**: Requires `NEXT_PUBLIC_DIRECTUS_URL` environment variable
- **Collections Used**:
  - `pages` - Page definitions with block references
  - `page_blocks` - Block metadata (collection type, item ID, visibility)
  - `block_gallery` - Gallery block content
  - `block_gallery_files` - Gallery item files
  - `block_logocloud` - Logo cloud block content
- **API Pattern**: REST API calls to `/items/{collection}` endpoints

### Environment Variables Required
- `NEXT_PUBLIC_DIRECTUS_URL` - Base URL for the Directus instance