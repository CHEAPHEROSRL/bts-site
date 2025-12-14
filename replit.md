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
- `pages/index.js` - Home page (fetches page with title "Home")
- `pages/[...slug].js` - Dynamic catch-all route for all other pages (fetches by permalink)
- `pages/api/` - API routes directory

### Components
- `components/Navbar.js` - Site-wide navigation header with logo, nav links, and CTA button (mobile responsive)
- `components/BlockRenderer.js` - Shared component that renders all Directus block types
- `components/Footer.js` - Site-wide footer with navigation links

### Shared Libraries
- `lib/directus.js` - Shared Directus API helpers (fetchItem, fetchItems, fetchPageBlocks)

### Styling Approach
- Global CSS in `styles/globals.css` with CSS custom properties
- Inline styles used in components for consistency

### Path Aliases
- `@/*` maps to the project root for cleaner imports

## External Dependencies

### Directus CMS
- **Purpose**: Headless CMS for all page and block content
- **Configuration**: Requires `NEXT_PUBLIC_DIRECTUS_URL` environment variable
- **Collections Used**:
  - `pages` - Page definitions with permalink and block references
  - `page_blocks` - Block metadata (collection type, item ID, visibility)
  - `block_hero` - Hero sections with title, headline, content, image
  - `block_richtext` - Rich text content blocks
  - `block_quote` - Quote blocks with author
  - `block_faqs` - FAQ accordion blocks
  - `block_video` - Video embeds (supports Loom)
  - `block_steps` - Process/steps blocks
  - `block_gallery` - Image gallery blocks
  - `block_logocloud` - Logo cloud blocks
  - `block_form` - Contact form blocks
  - `block_team` - Team info blocks
  - `block_testimonials` - Testimonial blocks
  - `block_columns` - Multi-column layouts
  - `block_cta` - Call-to-action blocks
- **API Pattern**: REST API calls to `/items/{collection}` endpoints
- **Image URLs**: `${DIRECTUS_URL}/assets/${imageId}`

### Environment Variables Required
- `NEXT_PUBLIC_DIRECTUS_URL` - Base URL for the Directus instance

## Recent Changes (December 2024)
- Implemented dynamic page routing - all Directus pages now render with consistent styling
- Created shared BlockRenderer component for all block types
- Added catch-all route `[...slug].js` for dynamic pages
- Centralized Directus fetch logic in `lib/directus.js`
- Pages without blocks configured in Directus show the footer only (expected behavior)

## CMS as Single Source of Truth (December 14, 2024)
- **Navbar**: Now fetches from Directus `navigation` collection (id="main")
  - Supports dropdown menus for items with `has_children=true`
  - Resolves page IDs to permalinks automatically
- **Footer**: Now fetches from Directus `navigation` collection (id="footer") + `globals`
  - Menu items from footer navigation
  - Social links from globals.social_links
  - Site title and tagline from globals
- **_app.js**: Uses `App.getInitialProps` to fetch navigation and globals for all pages
- **lib/directus.js**: Added `fetchNavigation()`, `fetchGlobals()`, `fetchAllPages()` helpers
- **ISR**: Content changes in Directus reflect on live site without redeploy

## Fully CMS-Driven Architecture (December 14, 2024)

ALL site content now comes from Directus CMS. No hardcoded content remains.

### CMS Collections Used:

**Navigation**
- `navigation` collection with id="main" for navbar menu items
- `navigation` collection with id="footer" for footer links
- `navigation` collection with id="cta" for CTA buttons (Let's Talk, Login)

**Forms**
- `forms` collection stores form schemas with fields, labels, placeholders, validation, submit button text
- `forms` key="newsletter" for footer newsletter form
- `forms` key="contact-us" for contact form
- Block forms (block_form) reference forms by ID

**Globals**
- Site title, tagline, description
- Social links (social_links array)
- Contact info (email, phone, address)
- Theme configuration

### New API Helpers (lib/directus.js)
- `fetchCtaButtons()` - Fetches CTA buttons from navigation/cta
- `fetchFormByKey(key)` - Fetches form by key (newsletter, contact-us)
- `fetchFormById(id)` - Fetches form by ID (for block_form)

### Data Flow
1. `_app.js` fetches: mainNav, footerNav, globals, ctaButtons, newsletterForm
2. Navbar receives: navigation, globals, ctaButtons
3. Footer receives: navigation, globals, newsletterForm
4. BlockRenderer: fetches form_data for block_form blocks dynamically

### Default Values
When CMS data unavailable, sensible defaults are used:
- CTA buttons default to "Let's Talk" (/contact-us) and "Login" (/portal)
- Site title defaults to "Agency OS"

### System/Error States
- Error messages ("Setup Required", "Error loading page data") are application-level, not content

### ISR (Incremental Static Regeneration)
- All pages use `revalidate: 60` for live updates without redeploy
